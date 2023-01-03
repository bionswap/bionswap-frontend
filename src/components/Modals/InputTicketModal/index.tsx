import { Stack, Typography, styled, Box, OutlinedInput, Button, IconButton } from '@mui/material';
import BaseModal from 'components/BaseModal';
import PrimaryLoadingButton from 'components/PrimaryLoadingButton';
import { useSingleCallResult } from 'hooks';
import { useBionTicket } from 'hooks/useContract';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';  
import { toastError } from 'hooks/useToast';

const tickets = [
  {
    value: '1',
    icon: '/images/TicketsAirdrop.png',
  },
  {
    value: '0',
    icon: '/images/Tickets.png',
  },
];

const inputButtonConfigs = [
  {
    label: 'x1',
    value: 1,
  },
  {
    label: 'x3',
    value: 3,
  },
  {
    label: 'x5',
    value: 5,
  },
  {
    label: 'Max',
    value: 'max',
  },
];

const InputTicketModal = ({
  open,
  onDismiss,
  account,
  totalSlots,
  filledSlots,
  parentContract,
  currentRoundId,
  shareOf
}: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [ticketType, setTicketType] = useState('1');
  const [inputTicket, setInputTicket] = useState(0);
  const [balanceOf, setBalanceOf] = useState(0);
  const [winRate, setWinRate] = useState<any>('--');
  const [avaiableSlot, setAvaiableSlot] = useState(0);
  const bionTicketContract = useBionTicket();

  const balanceAirdropTicket = Number(
    useSingleCallResult(bionTicketContract, 'balanceOf', [account, tickets[0].value])?.result?.[0] || 0,
  );
  const balanceNormalTicket = Number(
    useSingleCallResult(bionTicketContract, 'balanceOf', [account, tickets[1].value])?.result?.[0] || 0,
  );
  const isApprovedForAll =
    useSingleCallResult(bionTicketContract, 'isApprovedForAll', [account, parentContract?.address])?.result?.[0] ||
    false;

  const totalDeposit = shareOf;

  //   Set balanceOf following ticketType - 0:AirdropTicket - 1:NormalTicket -
  useEffect(() => {
    if (ticketType === '1') {
      setBalanceOf(balanceAirdropTicket);
    } else if (ticketType === '0') {
      setBalanceOf(balanceNormalTicket);
    }
  }, [ticketType, open]);

  //   Set win rate
  useEffect(() => {
    if (inputTicket) {
      setWinRate((inputTicket * 100) / totalSlots);
    } else {
      setWinRate('--');
    }
  }, [inputTicket, totalSlots]);

  //   Set Avaiable Slot
  useEffect(() => {
    setAvaiableSlot(totalSlots - filledSlots);
  }, [totalSlots, filledSlots]);

  const configs = [
    {
      label: 'Total deposit',
      value: `${totalDeposit} ${totalDeposit > 1 ? 'tickets' : 'ticket'}`,
    },
    {
      label: 'Win rate',
      value: `${winRate}%`,
    },
    {
      label: 'Avaiable slots',
      value: `${avaiableSlot}`,
    },
  ];

  const handleChange = (event: any) => {
    setInputTicket(event.target.value);
  };

  const changeInputTicket = (value: any) => {
    if (typeof value === 'string') {
      balanceOf > avaiableSlot ? setInputTicket(avaiableSlot) : setInputTicket(balanceOf);
    } else {
      setInputTicket(value);
    }
  };

  const changeTicketType = (value: string) => {
    setTicketType(value);
  };

  const deposit = async () => {
    try {
      if (!parentContract || !account || !bionTicketContract) return;
      if (isApprovedForAll) {
        setIsLoading(true);
        const tx = await parentContract.deposit(currentRoundId, ticketType, inputTicket);
        await tx.wait();
        setIsLoading(false);
        onDismiss();
      } else {
        setIsLoading(true);
        const tx = await bionTicketContract.setApprovalForAll(parentContract?.address, true);
        await tx.wait();
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      toastError(error?.message);
    }
  };

  return (
    <>
      <BaseModal
        open={open}
        sx={{
          padding: '15px',
          maxWidth: '352px',
          width: '100%',
          height: 'auto',
          maxHeight: '749px',
          overflowY: 'auto',
        }}
      >
        <IconButton onClick={onDismiss} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
        <Stack width="100%" gap="20px">
          <Typography variant="body3Poppins" fontWeight="400" color="background.paper">
            Input tickets
          </Typography>
          <Stack flexDirection="row" gap="20px" width="100%" justifyContent="flex-start">
            {tickets?.map((item: any) => (
              <WrapTicket
                key={item.icon}
                className={item.value === ticketType ? 'active' : ''}
                onClick={() => changeTicketType(item.value)}
              >
                <Image src={item.icon} alt="" width="75px" height="75px" />
              </WrapTicket>
            ))}
          </Stack>
          <Stack width="100%" gap="10px">
            <WrapBox>
              <Stack width="100%" flexDirection="row" justifyContent="space-between">
                <Typography variant="body4Poppins" fontWeight="400" color="success.main">
                  Input
                </Typography>
                <Typography variant="body4Poppins" fontWeight="400" color="gray.400">
                  Balance: {balanceOf}
                </Typography>
              </Stack>
              <InputCustom placeholder="0" value={inputTicket} onChange={handleChange} fullWidth />
            </WrapBox>
            <Stack width="100%" flexDirection="row" justifyContent="space-between">
              {inputButtonConfigs?.map((item: any) => (
                <ButtonItem key={item.label} onClick={() => changeInputTicket(item.value)}>
                  <Typography variant="captionPoppins" color="primary.main" fontWeight="400">
                    {item.label}
                  </Typography>
                </ButtonItem>
              ))}
            </Stack>
          </Stack>
          <Stack width="100%" gap="10px">
            {configs?.map((item: any) => (
              <Stack key={item.label} flexDirection="row" justifyContent="space-between" width="100%">
                <Typography variant="body4Poppins" fontWeight="400" color="gray.400">
                  {item.label}
                </Typography>
                <Typography variant="body4Poppins" fontWeight="400" color="blue.50">
                  {item.value}
                </Typography>
              </Stack>
            ))}
          </Stack>
          <PrimaryLoadingButton onClick={deposit} isLoading={isLoading} sx={{height: '41.59px'}}>
            <Typography variant="body3Poppins" fontWeight="600" color="#000000">
              {isApprovedForAll ? 'Confirm' : 'Approve'}
            </Typography>
          </PrimaryLoadingButton>
        </Stack>
      </BaseModal>
    </>
  );
};

const WrapTicket = styled(Box)`
  border: 1px solid #242d35;
  border-radius: 5px;
  height: 75px;
  width: 75px;
  overflow: hidden;
  cursor: pointer;

  &.active {
    border: 1px solid #07e0e0;
  }
`;
const WrapBox = styled(Stack)`
  width: 100%;
  border-color: ${(props) => props.theme.palette.gray[800]}
  border: 1px solid;
  border-radius: 4px;
  background: #000e12;
  padding: 10px;
  gap: 4px;
`;
const InputCustom = styled(OutlinedInput)`
  fieldset {
    display: none;
  }

  input {
    padding: 0;
    font-weight: 500;
    font-size: 28px;
    line-height: 45px;
    color: ${(props) => props.theme.palette.gray[200]};
    font-family: 'SamsungSharpSans-Bold';
  }
`;
const ButtonItem = styled(Button)`
  border: 1px solid rgba(141, 241, 250, 0.5);
  border-radius: 8px;
  max-width: 72px;
  width: 100%;
  height: 29px;
`;

export default InputTicketModal;
