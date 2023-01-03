import * as React from 'react';
import { Box, Stack, styled, Typography } from '@mui/material';

const NoDataView = () => {
  return (
    <WrapBox>
      <img src="/icons/nodata.svg" alt="nodata" />
      <Stack flexDirection="column" gap="4px">
        <Typography variant="body2Poppins" color="text.secondary" fontWeight="500">
          Hmm...
        </Typography>
        <Typography variant="body3Poppins" color="text.secondary" fontWeight="400">
          No data to display.
        </Typography>
      </Stack>
    </WrapBox>
  );
};

const WrapBox = styled(Box)`
  display: flex;
  width: 100%;
  height: 100%;
  border: 1px solid ${prop => (prop.theme.palette as any).extra.card.divider};
  border-radius: 8px;
  background-color: ${prop => (prop.theme.palette as any).extra.card.background};
  flex-direction: column;
  align-items: center;
  gap: 16px;
  justify-content: center;
`;

export default NoDataView;
