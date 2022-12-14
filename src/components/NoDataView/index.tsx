import * as React from 'react';
import { Box, Stack, styled, Typography } from '@mui/material';

const NoDataView = () => {
  return (
    <WrapBox>
      <img src="/icons/nodata.svg" alt="nodata" />
      <Stack flexDirection="column" gap="4px">
        <Typography variant="body2Poppins" color="gray.400" fontWeight="500">
          Hmm...
        </Typography>
        <Typography variant="body3Poppins" color="gray.400" fontWeight="400">
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
  border: 1px solid ${prop => prop.theme.palette.gray[800]};
  border-radius: 8px;
  background-color: ${prop => prop.theme.palette.gray[900]};
  flex-direction: column;
  align-items: center;
  gap: 16px;
  justify-content: center;
`;

export default NoDataView;
