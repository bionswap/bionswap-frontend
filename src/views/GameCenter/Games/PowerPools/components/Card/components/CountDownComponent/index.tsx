import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const CountDownComponent = ({ time }: any) => {
  const calculateTimeLeft = () => {
    let difference;
    difference = +new Date(Number(time)) - +new Date();

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
    <Typography variant="body4Poppins" fontWeight="500" color="gray.200">
      {timeLeft?.minutes || 0}:{timeLeft?.seconds || 0}
    </Typography>
  );
};

export default CountDownComponent;
