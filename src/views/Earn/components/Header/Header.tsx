import React from 'react'
import {
    Box,
    styled,
    Typography,
    Stack
} from '@mui/material'

const Header = () => {
  return (
    <div>
        <Stack alignItems='start'>
            <Typography fontSize='44px' fontWeight='700'>
                Earn
            </Typography>
            <Typography fontSize='20px' color='text.secondary' fontWeight='500'>
                Providing liquidity to get more rewards
            </Typography>
        </Stack>
    </div>
  )
}

export default Header