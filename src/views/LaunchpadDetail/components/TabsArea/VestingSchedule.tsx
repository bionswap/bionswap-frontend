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
import Image from 'next/image';

interface VestingScheduleProps {
  data: any;
}

const VestingSchedule: React.FC<VestingScheduleProps> = ({ data }) => {
  const nCycles = Math.ceil(
    data?.cycleReleasePercent ? (10000 - Number(data?.tgeReleasePercent || 0)) / Number(data?.cycleReleasePercent) : 0,
  );

  return (
    <Box display="flex" gap={3} sx={{ width: '100%' }}>
      <FlexBox flexDirection="column" gap="20px" width="100%">
        <ContentItem>
          <FlexBox
            width="100%"
            justifyContent="space-between"
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Typography variant="body3Poppins" color="text.primary" fontWeight="500">
              TGE
            </Typography>
            <Typography variant="body3Poppins" color="text.primary" fontWeight="500">
              {new Date(data?.tgeDate * 1000).toUTCString()}
            </Typography>
          </FlexBox>
          <Line />
          <FlexBox
            width="100%"
            justifyContent="space-between"
            alignItems='baseline'
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <Typography color="text.primary" >
              Initial claim percentage:
            </Typography>
            <Typography fontSize='18px' color="primary.main" fontWeight="600">
              {Number(data?.tgeReleasePercent || 0) / 100}%
            </Typography>
          </FlexBox>
          <Typography variant="body3Poppins" color="text.secondary" fontWeight="400">
            You can claim {Number(data?.tgeReleasePercent || 0) / 100}% of your purchased immediately on {new Date(data?.tgeDate * 1000).toUTCString()}. The remaining token
            will be released linearly over time until it is fully released at {new Date((Number(data?.tgeDate || 0) + Number(data?.cycleDuration || 0) * nCycles) * 1000).toUTCString()}
          </Typography>
        </ContentItem>
        {Array.from(Array(nCycles), (_, i) => i + 1).map((i) => (
          <ContentItem key={i}>
            <FlexBox
              width="100%"
              justifyContent="space-between"
              alignItems='baseline'
              sx={{
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Typography variant="body3Poppins" color="text.primary" fontWeight="500">
                Round {i}
              </Typography>
              <Typography variant="body3Poppins" color="text.primary">
                {new Date((Number(data?.tgeDate || 0) + Number(data?.cycleDuration || 0) * i) * 1000).toUTCString()}
              </Typography>
            </FlexBox>
            <Line />
            <FlexBox
              width="100%"
              justifyContent="space-between"
              alignItems='baseline'
              sx={{
                flexDirection: { xs: 'column', sm: 'row' },
              }}
            >
              <Typography variant="body3Poppins" color="text.secondary" fontWeight="400">
                Percentage:
              </Typography>
              <Typography fontSize='18px' color="primary.main" fontWeight="600">
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
    </Box>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const ContentItem = styled(Box)`
  background-color: ${(props) => (props.theme.palette as any).extra.swapPanel.background};
  border: 1px solid ${(props) => (props.theme.palette as any).extra.swapPanel.divider};
  border-radius: 4px;
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
  background-color: ${(props) => (props.theme.palette as any).extra.swapPanel.divider};
  width: 100%;
  height: 1px;
`;
const LineVertical = styled(Box)`
  height: 100%;
  height: calc(100% - 100px);
  width: 1px;
  background-color: ${(props) => props.theme.palette.text.primary};
  position: absolute;
  left: 62px;
  z-index: 1;
`;

export default VestingSchedule;
