import React from 'react'
import {
    Box,
    styled,
    Typography
} from '@mui/material'

export interface Props {
    title:string,
    isCurrent?: boolean,
    currentMessage?: string
}

const Title = ({title, isCurrent , currentMessage}:Props) => {
  return (
    <Flex>
        <Cross sx={{height: isCurrent ? '58px' : '20px'}}/>
        <Box>
            <Box>
                <Typography fontSize='28px' fontWeight='700' color='text.primary'>
                    {title}
                </Typography>
            </Box>
            {
                isCurrent &&
                <Box>
                    <Typography fontSize='19px' color='text.secondary'>
                        {currentMessage}
                    </Typography>
                </Box>
            }
        </Box>
    </Flex>
  )
}

const Flex = styled(Box)`
    display: flex;
    align-items: center;
    gap: 20px;
`
const Cross = styled(Box)`
    background-color: ${props => props.theme.palette.primary.main};
    width: 5px;
`

export default Title