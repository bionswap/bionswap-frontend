/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, styled, Typography , Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import { BUSD_ADDRESS, USDT_ADDRESS, USDC_ADDRESS } from '@bionswap/core-sdk';
import { useSingleCallResult, useToken } from 'hooks';
import { usePresaleContract } from 'hooks/useContract';
import { withCatch } from 'utils/error';

interface ProjectItemProps {
  data: any;
  account: string;
}

const AllocationCard: React.FC<ProjectItemProps> = ({ data, account }) => {
  const [claimLoading, setClaimLoading] = useState(false);
  const [vestingNextTime, setVestingNextTime] = useState<any>([]);
  const currentTime = +new Date();
  const presaleContract = usePresaleContract(data?.sale?.saleAddress || '');
  const quoteToken = useToken(data?.quoteToken);
  const [decimals, setDecimals] = useState(18);

  useEffect(() => {
    const handleCheckDecimal = () => {
      if (data?.isQuoteETH) {
        setDecimals(18);
      } else {
        setDecimals(quoteToken?.decimals || 9);
      }
    };

    handleCheckDecimal();
  }, [quoteToken, data]);

  const tokenAmountClaimed = formatUnits(
    useSingleCallResult(presaleContract, 'purchaseDetails', [account])?.result?.[2] || 0,
    decimals,
  );
  const calcClaimableTokenAmount = formatUnits(
    useSingleCallResult(presaleContract, 'calcClaimableTokenAmount', [account])?.result?.[0] || 0,
    decimals,
  );
  // const calcClaimableTokenAmount =
  //   useSingleCallResult(presaleContract, 'calcClaimableTokenAmount', [account])?.result;
  const calcPurchasedTokenAmount = formatUnits(
    useSingleCallResult(presaleContract, 'calcPurchasedTokenAmount ', [account])?.result?.[0] || 0,
    decimals,
  );

  const vestingTime = data?.sale?.tgeDate * 1000;
  const nCycles = Math.ceil(
    data?.sale?.cycleReleasePercent
      ? (10000 - Number(data?.sale?.tgeReleasePercent || 0)) / Number(data?.sale?.cycleReleasePercent)
      : 0,
  );
  const currentCycle = Math.ceil((currentTime - vestingTime) / (data?.sale?.cycleDuration * 1000));

  const token = useToken(data?.sale?.token, true);

  const configData = [
    {
      label: 'Available Now',
      value: `${calcClaimableTokenAmount} ${token?.symbol}`,
    },
    {
      label: 'Claimed',
      value: `${tokenAmountClaimed} ${token?.symbol}`,
    },
    {
      label: 'Total',
      value: `${calcPurchasedTokenAmount} ${token?.symbol}`,
    },
    {
      label:
        currentTime < +new Date(vestingTime) || Number(data?.sale?.tgeReleasePercent || 0) / 100 == 100
          ? 'Claim in'
          : 'Next Claim in',
      value:
        currentTime < +new Date(vestingTime) || Number(data?.sale?.tgeReleasePercent || 0) / 100 == 100
          ? new Date(vestingTime).toLocaleString()
          : new Date(vestingNextTime[currentCycle]).toLocaleString(),
    },
  ];

  useEffect(() => {
    const CalculateCycle = () => {
      let indents = [];
      for (var i = 0; i < nCycles; i++) {
        indents.push(+new Date(Number(data?.sale?.tgeDate || 0) + Number(data?.sale?.cycleDuration || 0) * i));
      }
      setVestingNextTime(indents);
    };

    CalculateCycle();
  }, [nCycles, vestingTime]);

  const handleClaim = async () => {
    try {
      setClaimLoading(true);
      const { error, result: tx } = await withCatch<any>(presaleContract?.claim());
      const receipt = await tx.wait();
      setClaimLoading(false);
    } catch (error: any) {
      setClaimLoading(false);
    }
  };

  return (
    <WrapBox>
      <Avatar>
        <img src={data?.sale?.banner} alt={data?.sale?.title} />
      </Avatar>
      <WrapText>
        <FlexBox justifyContent="space-between" width="100%" alignItems="center">
          <FlexBox gap="10px" alignItems="center">
            <Logo>
              <img src={data?.sale?.logo} alt={data?.sale?.title} />
            </Logo>
            <FlexBox flexDirection="column">
              <Typography fontSize='24px' fontWeight="500">
                {data?.sale?.title}
              </Typography>
              <Typography fontSize='14px' color="primary.main">
                ${token?.symbol}
              </Typography>
            </FlexBox>
          </FlexBox>
          <Status
            sx={{
              backgroundColor: 'warning.main',
              ...(currentTime >= vestingTime && {
                backgroundColor: 'success.main',
              }),
              ...(currentTime >= vestingNextTime[nCycles - 1] && {
                backgroundColor: '#717D8A',
              }),
            }}
          >
            <Typography variant="captionPoppins" color="text.primary" fontWeight="500">
              {currentTime > vestingNextTime[nCycles - 1] ? 'Closed' : currentTime >= vestingTime ? 'Open' : 'Waiting'}
            </Typography>
          </Status>
        </FlexBox>
        <Stack justifyContent='start' alignItems='start' spacing={2} width='100%'>
          {configData.map((item) => (
              (item.label !== 'Claim in' && item.label !== 'Next Claim in' || tokenAmountClaimed !== calcPurchasedTokenAmount)
            &&
            <FlexBox width='100%' key={item.label} justifyContent="space-between" alignItems="center">
              <Typography fontSize='14px' color="text.secondary" lineHeight='1'>
                {item.label}
              </Typography>
              <Typography color="text.primary" lineHeight='1'>
                {item.value}
              </Typography>
            </FlexBox>
          ))}
        </Stack>
        {tokenAmountClaimed !== calcPurchasedTokenAmount && (
          <>
            {currentTime < vestingTime ? (
              <CTA variant='contained' disabled>
                Not Available
              </CTA>
            ) : currentTime > vestingTime && Number(calcClaimableTokenAmount || 0) !== 0 ? (
              <CTA variant='contained' color='success' onClick={handleClaim} disabled={claimLoading}>
                {claimLoading ? 'Loading.....' : 'Claim'}
              </CTA>
            ) : (
              <CTA variant='contained' disabled>
                Waiting for next claim
              </CTA>
            )}
          </>
        )}
      </WrapText>
    </WrapBox>
  );
};
const FlexBox = styled(Box)`
  display: flex;
`;
const WrapBox = styled(Box)`
  border-radius: 8px;
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
  width: 100%;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: 0.15s ease-in;
  width: 100%;

  :hover {
    transform: scale3d(1.01, 1.01, 1);
    transform-style: preserve-3d;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;
const Avatar = styled(Box)`
  width: 100%;
  height: 140px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const WrapText = styled(Box)`
  display: flex;
  padding: 16px 16px 32px;
  flex-direction: column;
  gap: 40px;
`;
const Logo = styled(Box)`
  border: 2px solid ${(props) => (props.theme.palette as any).extra.card.background};
  background: ${(props) => (props.theme.palette as any).extra.card.background};
  border-radius: 8px;
  transform: matrix(-1, 0, 0, 1, 0, 0);
  max-width: 88px;
  width: 100%;
  height: 100%;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68px;
  height: 68px;
  object-fit: cover;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Status = styled(Box)`
  border-radius: 4px;
  width: 100px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CTA = styled(Button)`
  width: 100%;
  border-radius: 4px;
  width: 100%;
  height: 52px;
`;

export default AllocationCard;
