import React from 'react'
import {
    Box,
    styled,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material'

const Banner = () => {
    const isMobile = useMediaQuery('(max-width:700px)');
  return (
    <Wrapper
        pl={isMobile ? '16px' : '8rem'}
        height={isMobile ? '200px' : '327px'}
    >
        <Stack alignItems='start'>
            <Typography variant='h3Samsung'>
                Power Pools
            </Typography>
            <Typography sx={{color: 'gray.400'}}>
                Get tickets, join pool and hope for the win. It&apos;s easy!
            </Typography>
        </Stack>
    </Wrapper>
  )
}

const Wrapper = styled(Box)`
    background: url('/images/gamecenter/powerpools/powerpoolbanner.png');
    background-size: cover;
    background-repeat: no-reapeat;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
`

export default Banner