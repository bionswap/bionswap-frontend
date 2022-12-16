import React from 'react';
import {
  Box,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Typography,
  styled,
} from '@mui/material';
import IDOProcess from '../IDOProcess';

interface VestingScheduleProps {
  data: any;
}

const VestingSchedule: React.FC<VestingScheduleProps> = ({ data }) => {
  const nCycles = Math.ceil(
    data?.cycleReleasePercent ? (10000 - Number(data?.tgeReleasePercent || 0)) / Number(data?.cycleReleasePercent) : 0,
  );

  return (
    <Box display="flex" gap={3} sx={{ width: '100%' }}>
      <WrapBox>
        <LineVertical />
        <FlexBox
          sx={{
            gap: { xs: '20px', md: '40px' },
          }}
        >
          <Box zIndex="5">
            <img src="/icons/launchpad/ClaimTime.svg" alt="ClaimTime" />
          </Box>
          <FlexBox flexDirection="column" gap="10px" width="100%">
            <ContentItem>
              <FlexBox
                width="100%"
                justifyContent="space-between"
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Typography variant="body3Poppins" color="gray.400" fontWeight="400">
                  TGE
                </Typography>
                <Typography variant="body3Poppins" color="text.primary" fontWeight="600">
                  {new Date(data?.tgeDate * 1000).toUTCString()}
                </Typography>
              </FlexBox>
              <Line />
              <FlexBox
                width="100%"
                justifyContent="space-between"
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Typography variant="body3Poppins" color="text.primary" fontWeight="400">
                  Initial claim percentage:
                </Typography>
                <Typography variant="body3Poppins" color="primary.main" fontWeight="500">
                  {Number(data?.tgeReleasePercent || 0) / 100}%
                </Typography>
              </FlexBox>
              <Typography variant="body3Poppins" color="gray.400" fontWeight="400">
                You can claim {Number(data?.tgeReleasePercent || 0) / 100}% of your purchased BVT immediately on {new Date(data?.tgeDate * 1000).toUTCString()}. The remaining token
                will be released linearly over time until it is fully released at {new Date((Number(data?.tgeDate || 0) + Number(data?.cycleDuration || 0) * nCycles) * 1000).toUTCString()}
              </Typography>
            </ContentItem>
            {Array.from(Array(nCycles), (_, i) => i + 1).map((i) => (
              <ContentItem key={i}>
                <FlexBox
                  width="100%"
                  justifyContent="space-between"
                  sx={{
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <Typography variant="body3Poppins" color="gray.400" fontWeight="400">
                    Phase {i}
                  </Typography>
                  <Typography variant="body3Poppins" color="text.primary" fontWeight="600">
                    {new Date((Number(data?.tgeDate || 0) + Number(data?.cycleDuration || 0) * i) * 1000).toUTCString()}
                  </Typography>
                </FlexBox>
                <Line />
                <FlexBox
                  width="100%"
                  justifyContent="space-between"
                  sx={{
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <Typography variant="body3Poppins" color="text.primary" fontWeight="400">
                    Percentage:
                  </Typography>
                  <Typography variant="body3Poppins" color="primary.main" fontWeight="500">
                    {i === nCycles
                      ? (10000 -
                          Number(data?.tgeReleasePercent || 0) -
                          Number(data?.cycleReleasePercent || 0) * (i - 1)) /
                        100
                      : (data?.cycleReleasePercent || 0) / 100}{' '}
                    %
                  </Typography>
                </FlexBox>
              </ContentItem>
            ))}

            {/* <ContentItem>
              <FlexBox
                width="100%"
                justifyContent="space-between"
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Typography variant="body3Poppins" color="gray.400" fontWeight="400">
                  Phase 2
                </Typography>
                <Typography variant="body3Poppins" color="text.primary" fontWeight="600">
                  07/06/2022 - 04:30:00 PM
                </Typography>
              </FlexBox>
              <Line />
              <FlexBox
                width="100%"
                justifyContent="space-between"
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                }}
              >
                <Typography variant="body3Poppins" color="text.primary" fontWeight="400">
                  Initial claim percentage:
                </Typography>
                <Typography variant="body3Poppins" color="primary.main" fontWeight="500">
                  25%
                </Typography>
              </FlexBox>
            </ContentItem> */}
          </FlexBox>
        </FlexBox>
      </WrapBox>
    </Box>
  );
};

const WrapBox = styled(Box)`
  background: ${(props) => (props.theme.palette as any).extra.card.background};
  border: 1px solid;
  border-color: ${(props) => props.theme.palette.gray[700]};
  border-radius: 8px;
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  gap: 60px;
  position: relative;
`;
const FlexBox = styled(Box)`
  display: flex;
`;
const ContentItem = styled(Box)`
  background: #000a0d;
  border-radius: 6px;
  padding: 14px 25px;
  width: 100%;
  justify-content: space-between;
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${(props) => props.theme.breakpoints.down('sm')} {
    flex-direction: column;
  }
`;
const Line = styled(Box)`
  background-color: #717d8a;
  width: 100%;
  height: 1px;
`;
const LineVertical = styled(Box)`
  height: 100%;
  height: calc(100% - 100px);
  width: 2px;
  background-color: #000000;
  position: absolute;
  left: 62px;
  z-index: 1;
`;

export default VestingSchedule;
