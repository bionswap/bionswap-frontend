import { Stack, Typography, styled, Box, OutlinedInput } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import PrimaryLoadingButton from 'components/PrimaryLoadingButton';
import { useChain, useToken } from 'hooks';
import { buyBySig, getDiscount } from 'api/ticket';
import { BUSD_ADDRESS, USDT_ADDRESS, USDC_ADDRESS, Currency } from '@bionswap/core-sdk';
import { useTicketMachine } from 'hooks/useContract';
import { tryParseAmount } from 'utils/parse';
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback';
import { toastError } from 'hooks/useToast';

export declare type ConfigMap = {
  [chainId: string]: string;
};

const BuyTicket = () => {
  const exchange = 3;
  const [isLoading, setIsLoading] = useState(false);
  const [purchaseInput, setPurchaseInput] = useState(0);
  const ticketMachineContract = useTicketMachine();
  const { chainId, account } = useChain();
  const [discound, setDiscound] = useState(0);

  const handleChangeInput = (event: any) => {
    setPurchaseInput(event.target.value);
  };

  useEffect(() => {
    const handleGetDiscound = async () => {
      const res = await getDiscount(String(account || ''));
      setDiscound(res?.discount || 0);
    };
    handleGetDiscound();
  }, [account, chainId]);

  const configs = {
    [BUSD_ADDRESS[chainId]]: 'BUSD',
    [USDT_ADDRESS[chainId]]: 'USDT',
    [USDC_ADDRESS[chainId]]: 'USDC',
  };

  const [currency, setCurrency] = useState(BUSD_ADDRESS[chainId]);

  const token = useToken(currency);
  const parsedTotalTokenRequired = tryParseAmount(purchaseInput.toString(), token as Currency);
  const [approvalState, approveCallback] = useApproveCallback(parsedTotalTokenRequired, ticketMachineContract?.address);

  const handleBuyTicket = async () => {
    try {
      if (!ticketMachineContract || !account || !parsedTotalTokenRequired) return;
      if (approvalState === ApprovalState.APPROVED) {
        setIsLoading(true);
        const res = await buyBySig(chainId, currency, account, purchaseInput);
        console.log('🚀 ~ file: index.tsx ~ line 39 ~ handleBuyTicket ~ res', res);
        if (res) {
          const tx = await ticketMachineContract.buyTicketsByTokenBySig(
            res.currency,
            res.amount,
            res.pTotalPay,
            res.referrer,
            res.pRefReward,
            res.deadline,
            res.signature,
          );
          await tx.wait();
        }
        setIsLoading(false);
      } else if (approvalState === ApprovalState.NOT_APPROVED) {
        setIsLoading(true);
        await approveCallback().catch((err) => {
          toastError(err?.message);
          setIsLoading(false);
        });
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleSetCurrency = (event: string) => {
    setCurrency(event);
  };

  console.log('USDC_ADDRESS[chainId]===>', USDC_ADDRESS[chainId]);

  return (
    <Stack gap="20px">
      <Stack width="100%" gap="10px" alignItems="flex-start">
        <Typography>Buy with currency</Typography>
        <Stack flexDirection="row" gap="10px">
          {Object.keys(configs)?.map((item: any) => (
            <Currency
              key={item.icon}
              onClick={() => handleSetCurrency(item)}
              className={currency === item ? 'active' : ''}
            >
              <Box position="relative" width="20px" height="20px">
                <Image
                  src={`/icons/coins/${configs[item]}.svg`}
                  alt={`/icons/coins/${configs[item]}.svg`}
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
              <Typography variant="body3Poppins" lineHeight="18px" fontWeight="400" color="text.primary">
                {configs[item]}
              </Typography>
            </Currency>
          ))}
        </Stack>
      </Stack>
      <InputTicket flexDirection="row" width="100%">
        <Stack gap="4px" alignItems="flex-start" width="100%">
          <Typography variant="body4Poppins" color="success.main" fontWeight="400" lineHeight="180%">
            1 TICKET = {exchange} {configs[currency]}
          </Typography>
          <OutlinedInput
            value={purchaseInput}
            onChange={handleChangeInput}
            placeholder="0.00"
            type="number"
            sx={{
              fieldset: {
                display: 'none',
              },
              input: {
                padding: '0',
                fontWeight: '500',
                fontSize: '28px',
                lineHeight: '45px',
                color: 'gray.200',
              },
            }}
          />
        </Stack>
        <Box position="relative" width="80px" height="80px">
          <Image src="/images/Tickets.svg" alt="Tickets" layout="fill" objectFit="contain" />
        </Box>
      </InputTicket>
      <Stack width="100%" flexDirection="row" justifyContent="space-between">
        <Typography variant="body3Poppins" fontWeight="400" color="gray.400" lineHeight="180%">
          Cost ({configs[currency]})
        </Typography>
        <Typography variant="body2Poppins" fontWeight="500" color="text.primary" lineHeight="180%">
          {purchaseInput * exchange} {configs[currency]}
        </Typography>
      </Stack>
      <Stack width="100%" flexDirection="row" justifyContent="space-between">
        <Typography variant="body3Poppins" fontWeight="400" color="gray.400" lineHeight="180%">
          <Typography variant="body2Poppins" fontWeight="500" color="text.primary" lineHeight="180%">
            {discound}%
          </Typography>{' '}
          Tier discount
        </Typography>
        <Typography variant="body2Poppins" fontWeight="500" color="text.primary" lineHeight="180%">
          {(discound * (purchaseInput * exchange)) / 100} {configs[currency]}
        </Typography>
      </Stack>
      <Line />
      <Stack width="100%" flexDirection="row" justifyContent="space-between">
        <Typography variant="body3Poppins" fontWeight="400" color="gray.400" lineHeight="180%">
          You pay
        </Typography>
        <Typography variant="body2Poppins" fontWeight="500" color="text.primary" lineHeight="180%">
          {purchaseInput * exchange - (discound * (purchaseInput * exchange)) / 100} {configs[currency]}
        </Typography>
      </Stack>
      <ConfirmButton onClick={handleBuyTicket} isLoading={isLoading}>
        <Typography variant="body3Poppins" fontWeight="600" lineHeight="27px" color="#0C1620">
          {approvalState === ApprovalState.NOT_APPROVED ? 'Approve' : 'Comfirm'}
        </Typography>
      </ConfirmButton>
    </Stack>
  );
};

const InputTicket = styled(Stack)`
  border: 1px solid #242d35;
  border-radius: 4px;
  background: #000e12;
  padding: 20px 15px;
`;
const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.palette.gray[700]};
`;
const ConfirmButton = styled(PrimaryLoadingButton)`
  height: 52px;
`;
const Currency = styled(Stack)`
  border: 1.09785px solid #373f47;
  border-radius: 8px;
  flex-direction: row;
  gap: 5px;
  width: 86px;
  height: 40px;

  &.active {
    background: #242d35;
  }
`;

export default BuyTicket;
