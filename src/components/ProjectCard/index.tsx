/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { Box, Button, styled, Typography , Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import { BUSD_ADDRESS, USDT_ADDRESS, USDC_ADDRESS } from '@bionswap/core-sdk';
import { useChain, useSingleCallResult, useToken } from 'hooks';
import { usePresaleContract } from 'hooks/useContract';

interface ProjectItemProps {
  data: any;
}

const ProjectCard: React.FC<ProjectItemProps> = ({ data }) => {
  const router = useRouter();
  const token = useToken(data?.token , true);
  const presaleContract = usePresaleContract(data?.saleAddress || '');
  const quoteToken = useToken(data?.quoteToken);
  const { account, chainId } = useChain();
  const [decimals, setDecimals] = useState(18);
  const [vestingNextTime, setVestingNextTime] = useState<any>([]);
  const currentTime = +new Date();

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


  const vestingTime = data?.tgeDate * 1000;
  const currentCycle = Math.ceil((currentTime - vestingTime) / (data?.cycleDuration * 1000));


  const calcClaimableTokenAmount = formatUnits(
    useSingleCallResult(presaleContract, 'calcClaimableTokenAmount', [account])?.result?.[0] || 0,
    decimals,
  );
  const tokenAmountClaimed = formatUnits(
    useSingleCallResult(presaleContract, 'purchaseDetails', [account])?.result?.[2] || 0,
    decimals,
  );
  const calcPurchasedTokenAmount = formatUnits(
    useSingleCallResult(presaleContract, 'calcPurchasedTokenAmount ', [account])?.result?.[0] || 0,
    decimals,
  );

  
  const configData = [
    {
      label: 'Hard Cap',
      value: `${(data?.hardCap)/10e18} ${token?.symbol}`,
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
        currentTime < +new Date(vestingTime) || Number(data?.tgeReleasePercent || 0) / 100 == 100
          ? 'Claim in'
          : 'Next Claim in',
      value:
        currentTime < +new Date(vestingTime) || Number(data?.tgeReleasePercent || 0) / 100 == 100
          ? new Date(vestingTime).toLocaleString()
          : new Date(vestingNextTime[currentCycle]).toLocaleString(),
    },
  ];

  return (
    <WrapBox onClick={() => {
      router.push(`/dashboard/my-project/${data?.saleAddress}`);
    }}>
      <Avatar>
        <img
          src={data.banner}
          alt={data.title}
        />
      </Avatar>
      <WrapText>
        <Stack direction='row' gap="10px" justifyContent='start'>
          <Logo>
            <img src={data?.logo} alt={data?.title} />
          </Logo>
          <Stack direction='column' justifyContent='start' alignItems='start'>
            <Typography fontSize='24px' fontWeight="500">
              {data?.title}
            </Typography>
            <Typography fontSize='14px' color="primary.main">
              ${token?.symbol}
            </Typography>
          </Stack>
        </Stack>
        {/* <Stack justifyContent='start' alignItems='start' spacing={2} width='100%'>
          {configData.map((item) => (
              (item.label !== 'Claim in' && item.label !== 'Next Claim in' || tokenAmountClaimed !== calcPurchasedTokenAmount)
            &&
            <Stack width='100%' direction='row' key={item.label} justifyContent="space-between">
              <Typography fontSize='14px' color="text.secondary" lineHeight='1'>
                {item.label}
              </Typography>
              <Typography color="text.primary" lineHeight='1'>
                {item.value}
              </Typography>
            </Stack>
          ))}
        </Stack> */}
        <CTA variant='contained'>
          Continue Editing
        </CTA>
      </WrapText>
    </WrapBox>
  );
};
const WrapBox = styled(Box)`
  border-radius: 12px;
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
const WrapText = styled(Box)`
  display: flex;
  padding: 16px 16px 32px;
  flex-direction: column;
  gap: 30px;
`;
const CTA = styled(Button)`
  width: 100%;
  border-radius: 4px;
  width: 100%;
  height: 44px;
`;

export default ProjectCard;
