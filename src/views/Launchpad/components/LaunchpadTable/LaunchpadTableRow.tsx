import React, { useEffect, useState } from 'react';
import { Stack, Typography , styled, Box} from '@mui/material'
import { getComparator, stableSort } from './hooks';
import { StyledTableCell, StyledTableRow } from './Components/components';
import Image from 'next/image';
import { Data, Order } from './type';
import { useToken } from 'hooks';
import { formatUnits } from 'ethers/lib/utils';
import { BUSD_ADDRESS, USDT_ADDRESS, USDC_ADDRESS } from '@bionswap/core-sdk';
import Link from 'next/link';


const LaunchpadTableRow = ({item}:any) => {
  const [decimals, setDecimals] = useState(18);

  const currentTime = +new Date();
  const startTime = item?.startTime * 1000;
  const endTime = item?.endTime * 1000;

  const endedIn = new Date(endTime)

  const quoteToken = useToken(item?.quoteToken);


  const map = {
    [USDT_ADDRESS[item?.chainId]?.toLowerCase()]: 'USDT',
    [BUSD_ADDRESS[item?.chainId]?.toLowerCase()]: 'BUSD',
    [USDC_ADDRESS[item?.chainId]?.toLowerCase()]: 'USDC',
  };
  const unit = item?.isQuoteETH ? 'BNB' : map[item?.quoteToken];

  useEffect(() => {
    const handleCheckDecimal = () => {
      if (item?.isQuoteETH) {
        setDecimals(18);
      } else {
        setDecimals(quoteToken?.decimals || 9);
      }
    };

    handleCheckDecimal();
  }, [quoteToken, item]);

  return (
    <Link href={`/launchpad/${item?.saleAddress}`}>
        <StyledTableRow>
          <StyledTableCell component="th" scope="row">
            <Stack direction="row" justifyContent="start" spacing={2}>
              <WrapLogo>
                <img src={item?.logo} alt={item?.title} />
              </WrapLogo>
              <Stack alignItems="start">
                <Typography fontSize="inherit" fontWeight="inherit">
                  {item?.title}
                </Typography>
                <Typography fontSize="12px" color="text.secondary" fontWeight="400">
                  ${item?.tokenMetadata.symbol}
                </Typography>
              </Stack>
            </Stack>
          </StyledTableCell>
          <StyledTableCell align="right">
            <Status
              sx={{
                backgroundColor: theme => (theme.palette as any).extra.button.backgroundGreenOpacity,
                color: 'primary.main',
                ...(currentTime > startTime && {
                  backgroundColor: 'success.main',
                  color: 'white',
                }),
                ...(currentTime > endTime && {
                  backgroundColor: theme => (theme.palette as any).extra.card.light,
                  color: 'text.secondary',
                }),
              }}
            >
              <Typography
                sx={{
                  color: 'inherit',
                  fontWeight: '500',
                  fontSize: '10px'
                }}
              >
                {currentTime < startTime ? 'Coming Soon' : currentTime < endTime ? 'Sale Open' : 'Sale Closed'}
              </Typography>
            </Status>
          </StyledTableCell>
          <StyledTableCell align="right">
            {formatUnits(item?.hardCap || 0, decimals || 0)} {unit}
          </StyledTableCell>
          <StyledTableCell align="right">
            {formatUnits(item?.maxPurchase || 0, decimals)} {unit}
          </StyledTableCell>
          <StyledTableCell align="right">
            {formatUnits(item?.price || 0, decimals)} {unit}
          </StyledTableCell>
          <StyledTableCell align="right">
            <Stack alignItems='end' spacing={1}>
              <Typography fontSize='14px' lineHeight={1} fontWeight='inherit'>
                {endedIn.toDateString()}
              </Typography>
              <Typography fontSize='14px' lineHeight={1} color='text.secondary' fontWeight='400'>
                {endedIn.toLocaleTimeString()}
              </Typography>
            </Stack>
            
          </StyledTableCell>
        </StyledTableRow>
    </Link>
  );
};

const WrapLogo = styled(Box)`
  background-color: ${(props) => (props.theme.palette as any).background.default};
  border-radius: 50%;
  position: relative;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
  }
`;

const Status = styled(Stack)`
  padding: 4px 8px;
  border-radius: 4px;
  line-height: 1;
`;



export default LaunchpadTableRow;
