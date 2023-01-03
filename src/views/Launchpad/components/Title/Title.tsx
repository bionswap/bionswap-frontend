import React from 'react'
import {
    Box,
    styled,
    Typography,
    Stack
} from '@mui/material'
import useMediaQuery from 'hooks/useMediaQuery'

export interface Props {
    title:string,
    isCurrent?: boolean,
    currentMessage?: string
}

const Title = ({title, isCurrent , currentMessage}:Props) => {
    const {isMobile} = useMediaQuery()
  return (
    <Stack direction='row' spacing={2} justifyContent='start' width='100%'>
        <Cross sx={{height: isCurrent ? '60px' : '20px'}}/>
        <Stack spacing={1} alignItems='start' width='100%'>
            <Box>
                <Typography fontSize={isMobile ? '24px' : '28px'} fontWeight='700' color='text.primary' lineHeight='1'>
                    {title}
                </Typography>
            </Box>
            {
                isCurrent &&
                <Box>
                    <Typography fontSize={isMobile ? '16px' : '19px'} color='text.secondary' lineHeight='1'>
                        {currentMessage}
                    </Typography>
                </Box>
            }
        </Stack>
    </Stack>
  )
}

const Cross = styled(Box)`
    background-color: ${props => props.theme.palette.primary.main};
    width: 5px;
`

export default Title