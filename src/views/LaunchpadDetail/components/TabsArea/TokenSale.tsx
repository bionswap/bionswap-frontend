import React, { useEffect, useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import IDOProcess from '../IDOProcess';
import { formatEther, formatUnits } from 'ethers/lib/utils';
import { useToken } from 'hooks';

interface TokenSaleProps {
  data: any;
  isMobile: boolean;
  unit?: string;
  tokenContract: any;
}

const TokenSale: React.FC<TokenSaleProps> = ({ data, isMobile = false, unit, tokenContract }) => {
  console.log("🚀 ~ file: TokenSale.tsx ~ line 15 ~ data", data)
  const quoteToken = useToken(data?.quoteToken);
  const startTime = data?.startTime * 1000;
  const endTime = data?.endTime * 1000;
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

  const fetchData = [
    {
      allocation: 'Sale Price',
      tokenSale: `1 ${tokenContract?.symbol} = ${formatUnits(data?.listingPrice || 0, decimals)} ${unit}`,
    },
    {
      allocation: 'Sale Allocation',
      tokenSale: `${formatUnits(data?.minPurchase || 0, decimals)} ${unit} - ${formatUnits(data?.maxPurchase || 0, decimals)} ${unit}`,
    },
    {
      allocation: 'Sale Goal',
      tokenSale: `${formatUnits(data?.minGoal || 0, decimals)} ${unit} - ${formatUnits(data?.maxGoal || 0, decimals)} ${unit}`,
    },
    {
      allocation: 'Sale Start Time',
      tokenSale: `${new Date(startTime).toUTCString()}`,
    },
    {
      allocation: 'Sale End Time',
      tokenSale: `${new Date(endTime).toUTCString()}`,
    },
    {
      allocation: 'Token Address',
      tokenSale: `${data?.token}`,
    },
    {
      allocation: 'Sale Address',
      tokenSale: `${data?.saleAddress}`,
    },
  ];
  return (
    <Box display="flex" gap={3} sx={{ width: '100%' }} flexDirection={isMobile ? 'column' : 'row'}>
      <Box width={isMobile ? '100%' : '70%'}>
        <Box
          sx={{
            border: '1px solid',
            borderColor: theme => (theme.palette as any).extra.swapPanel.divider,
            borderRadius: '4px',
            width: '100%',
            overflow: 'hidden',
            backgroundColor: theme => (theme.palette as any).extra.swapPanel.background,
          }}
        >
          <Box
            sx={{
              padding: '15px 20px',
              backgroundColor: theme => (theme.palette as any).extra.swapPanel.hover,
            }}
          >
            <Typography fontWeight="500" color="text.primary">
              Token Sale
            </Typography>
          </Box>
          {fetchData?.map((item, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent="space-between"
              sx={{
                padding: '20px',
                borderTop: '1px solid',
                borderColor: theme => (theme.palette as any).extra.swapPanel.divider,
                flexDirection: { xs: 'column', md: 'row' },
              }}
            >
              <Typography fontWeight="400" color="text.secondary">
                {item.allocation}
              </Typography>
              <Typography fontWeight="400" color="text.primary">
                {item.tokenSale}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default TokenSale;
