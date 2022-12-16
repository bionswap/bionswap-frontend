import React, { useEffect, useState } from 'react';
import { Box, Typography, styled } from '@mui/material';

const Countdown = ({ endTime, startTime }: any) => {
  const currentTime = +new Date();

  const calculateTimeLeft = () => {
    let difference;
    if (currentTime > startTime) {
      difference = +new Date(Number(endTime)) - +new Date();
    } else {
      difference = +new Date(Number(startTime)) - +new Date();
    }

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / 1000 / 60 / 60 / 24),
        hours: Math.floor((difference / 1000 / 60 / 60) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  return (
    <FlexBox ml="120px" gap="3px">
      <Typography color="text.secondary" fontSize='12px' lineHeight='1'>
        {currentTime > startTime ? 'Sales end in:' : 'Sales start in:'}
      </Typography>
      <Typography color="text.secondary" fontSize='12px' lineHeight='1'>
        {timeLeft?.days || 0}d {timeLeft?.hours || 0}:{timeLeft?.minutes || 0}:{timeLeft?.seconds || 0}
      </Typography>
    </FlexBox>
  );
};

const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
`;

export default Countdown;
