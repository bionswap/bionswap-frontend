import { Stack, Typography, styled, Box, LinearProgress } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import PlayCircleOutlineOutlinedIcon from '@mui/icons-material/PlayCircleOutlineOutlined';
import {CgPlayButtonO} from 'react-icons/cg'
import { useEffect, useState } from 'react';

interface HeadCardProps {
  totalSlots: number;
  filledSlots: number;
  currentRoundId: number;
  isRoundStart: boolean;
  status: number;
}

const statuses = [
  {
    id: 0,
    label: 'Live',
    icon: <PlayCircleOutlineOutlinedIcon />,
    color: 'primary.main',
    bgColor: 'extra.button.backgroundGreenOpacity',
  },
  {
    id: 1,
    label: 'Drawing',
    icon: <CachedIcon />,
    color: 'text.secondary',
    bgColor: 'extra.card.light',
  },
  {
    id: 2,
    label: 'Ended',
    icon: <CheckCircleOutlinedIcon/>,
    color: 'text.secondary',
    bgColor: 'extra.card.light',
  },
];

const HeadCard = ({ totalSlots, filledSlots, currentRoundId, status }: HeadCardProps) => {
  const [progress, setProgress] = useState(0);

  //   Set value progress for component LinearProgress
  useEffect(() => {
    if (status != 0) {
      setProgress(100);
    } else {
      setProgress((filledSlots * 100) / totalSlots);
    }
  }, [status, filledSlots, totalSlots]);

  return (
    <>
      {statuses?.map(
        (item: any) =>
          item.id === status && (
            <Header key={item.label} bgcolor={item.bgColor}>
              <Stack direction="row" alignItems="center" justifyContent="space-between" width="100%">
                <Stack direction="row" alignItems="center" spacing={1} color={item.color}>
                  {item.icon}
                  <Typography variant="body3Poppins" fontWeight="600" color={item.color} textTransform="uppercase">
                    {item.label}
                  </Typography>
                </Stack>
                <Typography variant="body3Poppins" fontWeight="400" color={item.color}>
                  #{status === 2 && currentRoundId !=0 ? currentRoundId - 1 : currentRoundId}
                </Typography>
              </Stack>
            </Header>
          ),
      )}
      {statuses?.map(
        (item: any) =>
          item.id === status && (
            <Box key={item.label} color={item.color}>
              <LinearProgress color="inherit" variant="determinate" value={progress} />
            </Box>
          ),
      )}
    </>
  );
};

const Header = styled(Box)`
  padding: 8px 10px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

export default HeadCard;
