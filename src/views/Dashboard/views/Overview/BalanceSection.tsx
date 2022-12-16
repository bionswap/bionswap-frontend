import React from 'react'
import {
    Box,
    styled,
    Typography,
    SvgIcon
} from '@mui/material'
import { MobileProp } from 'configs/Type/Mobile/type'
import Card from '../../components/Card'
import BionTokenIcon from 'assets/icons/BionTokenIcon'
import BionRaiseToken from 'assets/icons/BionRaiseToken'
import Image from 'next/image'

const BalanceSection = ({isMobile}:MobileProp) => {
  return (
    <Box display='grid' alignItems='center' gap='24px' sx={{
        gridTemplateColumns: isMobile ? 'auto' : 'auto auto', justifyContent: 'start'
    }}>
        <Card sx={{
            height: 'fit-content' , width: '100%'
        }}>
            <Flex alignItems='center' gap='16px' flexWrap='wrap'>
                <SvgIcon sx={{
                    width: '50px', height: '50px'
                }}>
                    <BionTokenIcon/>
                </SvgIcon>
                <Box>
                    <Box>
                        <Typography variant='caption6Poppins' sx={{color: 'primary.main'}}>
                            Your Balance
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant={isMobile ? 'body4Poppins' : 'h6Poppins'}>
                            0.00 BION
                        </Typography>
                    </Box>
                </Box>
            </Flex>
        </Card>
        <Card sx={{
            height: 'fit-content', width: '100%'
        }}>
            <Flex alignItems='center' gap='16px' flexWrap='wrap'>
                <SvgIcon sx={{
                    width: '50px', height: '50px'
                }}>
                    <BionTokenIcon/>
                </SvgIcon>
                <Box>
                    <Box>
                        <Typography variant='caption6Poppins' sx={{color: 'primary.main'}}>
                            BION Price
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant={isMobile ? 'body4Poppins' : 'h6Poppins'}>
                            $0.00
                        </Typography>
                    </Box>
                </Box>
            </Flex>
        </Card>
        <Card sx={{
            height: 'fit-content', width: '100%'
        }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center'
            }}>
                <Box>
                    <SvgIcon sx={{
                        width: '80px', height: '80px'
                    }}>
                        <BionRaiseToken/>
                    </SvgIcon>
                </Box>
                <Box>
                    <Typography variant='caption6Poppins' sx={{color: 'primary.main'}}>
                        Daily Earning
                    </Typography>
                </Box>
                <Box sx={{marginBottom: '10px'}}>
                    <img src='/icons/dashboard/divider.png' alt='' width='100%' />
                </Box>
                
                <Box>
                    <Typography variant='h4Poppins' sx={{fontWeight: '600', lineHeight: '1'}}>
                        0.00 BION
                    </Typography>
                </Box>
                <Box>
                    <Typography sx={{color: 'primary.main', fontWeight: '600'}}>
                        $0.00
                    </Typography>
                </Box>
            </Box>
        </Card>
        <Card sx={{
            height: 'fit-content', width: '100%'
        }}>
            <Box sx={{
                display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center'
            }}>
                <Box>
                    <SvgIcon sx={{
                        width: '80px', height: '80px'
                    }}>
                        <BionRaiseToken/>
                    </SvgIcon>
                </Box>
                <Box>
                    <Typography variant='caption6Poppins' sx={{color: 'primary.main'}}>
                        Total BION Claimed
                    </Typography>
                </Box>
                <Box sx={{marginBottom: '10px'}}>
                    <img src='/icons/dashboard/divider.png' alt='' width='100%' />
                </Box>
                
                <Box>
                    <Typography variant='h4Poppins' sx={{fontWeight: '600', lineHeight: '1'}}>
                        0.00 BION
                    </Typography>
                </Box>
                <Box>
                    <Typography sx={{color: 'primary.main', fontWeight: '600'}}>
                        $0.00
                    </Typography>
                </Box>
            </Box>
        </Card>
    </Box>
  )
}

const Flex = styled(Box)`
    display: flex;
`

export default BalanceSection