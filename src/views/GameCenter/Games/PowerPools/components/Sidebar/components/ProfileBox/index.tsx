import React from 'react';
import { Box, styled, Stack, Typography, Button } from '@mui/material';
import { useAccount } from 'hooks';
import { shortenAddress } from 'utils/format';
import { IoTicket } from 'react-icons/io5';
import Avatar from '../../../Avatar';

const ProfileBox = () => {
  const { address } = useAccount();

  return (
    <Stack spacing={3} width="100%">
      <Stack direction="row" justifyContent="space-between" width="100%" alignItems="center">
        <Typography variant="body2Poppins" fontWeight="500" color="text.primary">
          Personal
        </Typography>
        <Typography variant="body4Poppins" fontWeight="500" color="success.main" textTransform="uppercase">
          Rank Detail
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} width="100%" justifyContent="start" alignItems="center">
        <Avatar />
        <Stack alignItems="start">
          <Typography sx={{ fontWeight: '600' }}>{shortenAddress(address ?? '')}</Typography>
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: '14px',
            }}
          >
            500 XP
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ProfileBox;
