import * as React from 'react';
import { Skeleton, Stack } from '@mui/material';

const SkeletonCard = () => {
  return (
    <Stack alignItems="flex-start" spacing={1}>
      <Skeleton  width={350} height={60} />

      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton width={40} height={40} />
      <Skeleton width={350} height={60} />
      <Skeleton width={350} height={60} />
    </Stack>
  );
};

export default SkeletonCard;
