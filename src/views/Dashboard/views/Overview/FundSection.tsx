import { MobileProp } from 'configs/Type/Mobile/type'
import React from 'react'
import {
    Box,
    Button,
    styled,
    Typography
} from '@mui/material'
import Card from '../../components/Card'
import { useRouter } from 'next/router'

const FundSection = ({isMobile}:MobileProp) => {
  const router = useRouter()
  return (
    <Box>
        <Card sx={{
            display: 'flex', flexDirection: 'column', gap: '42px',
            width: '100%'
        }}>
            <Flex>
                <Box>
                    <Box>
                        <Typography variant='h5Samsung' >
                            Fund Your Account
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='caption6Poppins' sx={{color: 'gray.400'}}>
                            Get BION for multiple profits. Find a method that suits you the most.
                        </Typography>
                    </Box>
                </Box>
            </Flex>
            <Flex alignItems='center' justifyContent='space-between'>
                <Box>
                    <Box>
                        <Typography variant='body3Poppins' sx={{color: 'primary.main'}}>
                            Buy Token
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='captionPoppins' sx={{color: 'gray.300'}}>
                            Get token with the best price.
                        </Typography>
                    </Box>
                </Box>
                <BuyButton
                    variant='contained'
                    onClick={(e) => {
                        e.preventDefault();
                        router.push('/swap')
                    }}
                >
                    Buy
                </BuyButton>
            </Flex>
            <Flex alignItems='center' justifyContent='space-between'>
                <Box>
                    <Box>
                        <Typography variant='body3Poppins' sx={{color: 'primary.main'}} >
                            Get sBION
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='captionPoppins' sx={{color: 'gray.300'}}>
                            Audit DAO Governance Credit provide you more power.
                        </Typography>
                    </Box>
                </Box>
                <StyledButton
                    variant='contained'
                    disabled
                >
                    Stake
                </StyledButton>
            </Flex>
            <Flex alignItems='center' justifyContent='space-between'>
                <Box>
                    <Box>
                        <Typography variant='body3Poppins' sx={{color: 'primary.main'}}>
                            Get Game Ticket
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant='captionPoppins' sx={{color: 'gray.300'}}>
                            Buy ticket and get super multiply profit.
                        </Typography>
                    </Box>
                </Box>
                <StyledButton
                    variant='contained'
                    disabled
                >
                    Buy
                </StyledButton>
            </Flex>
        </Card>
    </Box>
  )
}

const Flex = styled(Box)`
    display: flex;
`

const BuyButton = styled(Button)`
    height: fit-content;
    transition: .12s ease-in;
    width: 100px;
    :hover {
        background-color: ${prop => prop.theme.palette.primary.main};
        opacity: .8;
    }
`
const StyledButton = styled(Button)`
    height: fit-content;
    transition: .12s ease-in;
    font-weight: 400;
    width: 100px;
    color: ${prop => prop.theme.palette.text.primary};
    background-color: #575757;
    :hover {
        background-color: #575757;
        opacity: .8;
    }
`

export default FundSection