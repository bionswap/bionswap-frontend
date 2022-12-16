import { Box, linearProgressClasses, LinearProgress, Button, styled, Typography, Stack } from '@mui/material';
import CountDownTime from './CountDownTime';
import { formatUnits } from 'ethers/lib/utils';
import { useSingleCallResult } from 'hooks/useCall';
import JoinIdoModal from 'components/JoinIdoModal';
import React, { useEffect, useState } from 'react';
import { useChain } from 'hooks';
import Link from 'next/link';
import useMediaQuery from 'hooks/useMediaQuery';

interface FundraiseAreaProps {
  data: any;
  token: any;
  quoteToken: any;
  presaleContract: any;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: (theme.palette as any).extra.card.hover,
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: 'success.main',
  },
}));

const FundraiseArea: React.FC<FundraiseAreaProps> = ({ data, token, quoteToken, presaleContract }) => {
  const [openModal, setOpenModal] = useState(false);
  const {isMobile} = useMediaQuery();
  const { account } = useChain();
  const [decimals, setDecimals] = useState(18);
  const currentCap = formatUnits(useSingleCallResult(presaleContract, 'currentCap')?.result?.[0] || 0, decimals);
  const yourPurchased = formatUnits(
    useSingleCallResult(presaleContract, 'purchaseDetails', [account])?.result?.[1] || 0,
    decimals,
  );
  const whitelisteds = useSingleCallResult(presaleContract, 'whitelisteds', [account])?.result?.[0] || false;
  const startTime = data?.startTime * 1000;
  const endTime = data?.endTime * 1000;
  const linearProgress = (Number(currentCap) * 100) / Number(formatUnits(data?.hardCap || 0, decimals));
  const unit = data?.isQuoteETH ? 'BNB' : quoteToken?.symbol;
  const currentTime = +new Date();

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

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

  return (
    <>
      <FlexBox
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: '20px', lg: '50px' },
        }}
      >
        <Box
          sx={{
            width: '100%',
            borderRadius: '8px',
            overflow: 'hidden',
            height: '560px',
          }}
        >
          <Box
            width="100%"
            height="100%"
            component="img"
            src={data?.banner}
            alt={data?.title}
            sx={{
              objectFit: 'cover',
            }}
          />
        </Box>
        <WrapInforBox
          sx={{
            // maxWidth: { xs: '100%', md: '365px', lg: '430px' },
          }}
        >
          <Stack alignItems='start' mb='20px'>
            <Typography color='text.secondary'>
              Fundraise Goal
            </Typography>
            <Typography fontSize='40px' color="text.primary" fontWeight="700" sx={{textShadow: 'rgb(255 255 255 / 30%) 0px 0px 12px'}}>
              {formatUnits(data?.hardCap || 0, decimals)} {unit}
            </Typography>
          </Stack>
          <Stack alignItems='start' spacing={1} width='100%'>
            <Stack
              direction={ isMobile ? 'column' : 'row' }
              justifyContent="space-between"
              alignItems='baseline'
              width='100%'
            >
              <Typography fontSize='16px' color="text.secondary">
                Max Allocation
              </Typography>
              {/* <Typography fontSize='19px' color="text.primary">
                {formatUnits(data?.minPurchase || 0, decimals)} {unit} - {formatUnits(data?.maxPurchase || 0, decimals)}{' '}
                {unit}
              </Typography> */}
              <Typography fontSize='19px' color="text.primary">
                {formatUnits(data?.maxPurchase || 0, decimals)}{' '}
                {unit}
              </Typography>
            </Stack>
            <Stack
              direction={ isMobile ? 'column' : 'row' }
              justifyContent="space-between"
              alignItems='baseline'
              width='100%'
            >
              <Typography fontSize='16px' color="text.secondary">
                Price per token
              </Typography>
              <Typography fontSize='19px' color="text.primary">
                {formatUnits(data?.price || 0, decimals)} {unit}
              </Typography>
            </Stack>
            {/* <FlexBox
              justifyContent="space-between"
              sx={{
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Typography variant="h6Poppins" color="gray.400" fontWeight="400">
                Participaters
              </Typography>
              <Typography variant="h6Poppins" color="gray.200" fontWeight="400">
                320
              </Typography>
            </FlexBox> */}
            <Stack
              direction={ isMobile ? 'column' : 'row' }
              justifyContent="space-between"
              alignItems='baseline'
              width='100%'
            >
              <Typography fontSize='16px' color="text.secondary">
                Current raised
              </Typography>
              <Typography fontSize='19px' color="text.primary">
                {currentCap} {unit}
              </Typography>
            </Stack>
            <BorderLinearProgress variant="determinate" value={linearProgress} />
          </Stack>
          <FlexBox>
            {startTime > currentTime ? (
              <JoinButton disabled sx={{ backgroundColor: 'gray.200' }}>
                <Typography variant="body3Poppins" color="gray.400" fontWeight="600">
                  Not Available
                </Typography>
              </JoinButton>
            ) : Number(yourPurchased) !== 0 ? (
              <Link href={'/dashboard/allocation'}>
                <JoinButton sx={{ backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.main' } }}>
                  <Typography variant="body3Poppins" color="#000000" fontWeight="600">
                    View your allocation
                  </Typography>
                  <img src="/images/arrow_forward.png" alt="arrow_forward" width="20px" />
                </JoinButton>
              </Link>
            ) : currentTime > endTime ? (
              <Link href={`/swap?inputCurrency=ETH&outputCurrency=${token?.address}`}>
                <JoinButton sx={{ backgroundColor: 'primary.main', '&:hover': { backgroundColor: 'primary.main' } }}>
                  <Typography variant="body3Poppins" color="#000000" fontWeight="600">
                    View {token?.symbol} on Bionswap
                  </Typography>
                  <img src="/images/arrow_forward.png" alt="arrow_forward" width="20px" />
                </JoinButton>
              </Link>
            ) : whitelisteds && data?.isWhitelistEnabled ? (
              <JoinButton disabled sx={{ backgroundColor: 'gray.200' }}>
                <Typography variant="body3Poppins" color="gray.400" fontWeight="600">
                  You are not whitelisted
                </Typography>
              </JoinButton>
            ) : (
              <JoinButton
                onClick={handleOpenModal}
                sx={{ backgroundColor: 'success.main', '&:hover': { backgroundColor: 'success.main' } }}
              >
                <Typography variant="body3Poppins" color="#000000" fontWeight="600">
                  Join IDO Now!
                </Typography>
              </JoinButton>
            )}
          </FlexBox>
          <Box>
            <CountDownTime endTime={endTime} startTime={startTime} />
          </Box>
        </WrapInforBox>
      </FlexBox>
      <JoinIdoModal data={data} open={openModal} onDismiss={handleCloseModal} unit={unit} currentCap={currentCap} />
    </>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const WrapInforBox = styled(Box)`
  padding: 32px;
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background-color: ${(props) => (props.theme.palette as any).extra.card.light};
`;
const JoinButton = styled(Button)`
  border-radius: 4px;
  width: 100%;
  text-align: center;
  padding: 8px;
  gap: 5px;
`;

export default FundraiseArea;
