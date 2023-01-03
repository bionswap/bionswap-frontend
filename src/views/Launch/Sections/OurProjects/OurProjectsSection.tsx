/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Box,
    styled,
    Typography,
    Container
} from '@mui/material'
import { MobileProp } from 'configs/Type/Mobile/type'
import { ourProjectsConfig, serviceConfig } from './config'

const OurProjectsSection = ({ isMobile }: MobileProp) => {
    const Wrapper = styled(Box)`
        width: 100%;
        background-color: #000918;
        padding-top: ${isMobile ? '50px' : '0'};
        padding-bottom: ${isMobile ? '80px' : '90px'};
        display: flex;
        flex-direction: column;
        gap: ${isMobile ? '50px' : '35px'};
    `
    const WrapItems = styled(Box)`
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
        overflow: hidden;
    `
    const BoxLine = styled(Box)`
        display: flex;
        alignItems: center;
        gap: 24px;
    `
    const Item = styled(Box)`
        background: linear-gradient(180deg, #0C1620 0%, rgba(12, 22, 32, 0) 100%);
        border: 1px solid;
        border-color: ${(props) => (props.theme.palette.primary.dark)};
        border-radius: 12px;
        padding: 10px 16px;
    `

    return (
        <>
            <Wrapper>
                <Typography variant='subtitle1' color='gray.400' fontWeight="700" textAlign='center'>
                    Stand together, grow together
                </Typography>
                <WrapItems>
                    <Box display='flex' gap='24px' alignItems="center">
                        <BoxLine sx={{
                            animation: 'animatedRightToLeftTransaction 153.814s infinite linear 0.5s both',
                        }}>
                            {
                                ourProjectsConfig.map((item, index) => (
                                    index < 8
                                        ?
                                        <Item display='flex' gap="10px" alignItems="center" justifyContent="center" >
                                            <Box component='img' src={item.logo} alt={item.name} />
                                            <Typography variant='body3Poppins' color='gray.300' fontWeight='600' fontFamily='Inter' whiteSpace='nowrap'>
                                                {item.name}
                                            </Typography>
                                            <Typography variant='body4Poppins' color='#9A6AFF' fontWeight='400' fontFamily='Inter' whiteSpace='nowrap'>
                                                {item.symbol}
                                            </Typography>
                                        </Item>
                                        :
                                        null
                                ))
                            }
                        </BoxLine>
                        <BoxLine sx={{
                            animation: 'animatedRightToLeftTransaction 153.814s infinite linear 0.5s both',
                        }}>
                            {
                                ourProjectsConfig.map((item, index) => (
                                    index < 8
                                        ?
                                        <Item display='flex' gap="10px" alignItems="center" justifyContent="center" >
                                            <Box component='img' src={item.logo} alt={item.name} />
                                            <Typography variant='body3Poppins' color='gray.300' fontWeight='600' fontFamily='Inter' whiteSpace='nowrap'>
                                                {item.name}
                                            </Typography>
                                            <Typography variant='body4Poppins' color='#9A6AFF' fontWeight='400' fontFamily='Inter' whiteSpace='nowrap'>
                                                {item.symbol}
                                            </Typography>
                                        </Item>
                                        :
                                        null
                                ))
                            }
                        </BoxLine>
                    </Box>
                    <Box display='flex' gap='24px' alignItems="center">
                        <BoxLine sx={{
                            animation: 'animatedLeftToRightTransaction 151.149s infinite linear 0.5s both',
                        }}>
                            {
                                ourProjectsConfig.map((item, index) => (
                                    (index >= 8 && index < 15) || index === 7
                                        ?
                                        <Item display='flex' gap="10px" alignItems="center" justifyContent="center" >
                                            <Box component='img' src={item.logo} alt={item.name} />
                                            <Typography variant='body3Poppins' color='gray.300' fontWeight='600' fontFamily='Inter' whiteSpace='nowrap'>
                                                {item.name}
                                            </Typography>
                                            <Typography variant='body4Poppins' color='#9A6AFF' fontWeight='400' fontFamily='Inter' whiteSpace='nowrap'>
                                                {item.symbol}
                                            </Typography>
                                        </Item>
                                        :
                                        null
                                ))
                            }
                        </BoxLine>
                        <BoxLine sx={{
                            animation: 'animatedLeftToRightTransaction 151.149s infinite linear 0.5s both',
                        }}>
                            {
                                ourProjectsConfig.map((item, index) => (
                                    (index >= 8 && index < 15) || index === 7
                                        ?
                                        <Item display='flex' gap="10px" alignItems="center" justifyContent="center" >
                                            <Box component='img' src={item.logo} alt={item.name} />
                                            <Typography variant='body3Poppins' color='gray.300' fontWeight='600' fontFamily='Inter' whiteSpace='nowrap'>
                                                {item.name}
                                            </Typography>
                                            <Typography variant='body4Poppins' color='#9A6AFF' fontWeight='400' fontFamily='Inter' whiteSpace='nowrap'>
                                                {item.symbol}
                                            </Typography>
                                        </Item>
                                        :
                                        null
                                ))
                            }
                        </BoxLine>
                    </Box>
                    <Box display='flex' gap='24px' alignItems="center">
                        <BoxLine sx={{
                            animation: 'animatedRightToLeftTransaction 150.465s infinite linear 0.5s both',
                        }}>
                            {
                                ourProjectsConfig.map((item, index) => (
                                    index >= 15 || index === 1
                                        ?
                                        <Item display='flex' gap="10px" alignItems="center" justifyContent="center" >
                                            <Box component='img' src={item.logo} alt={item.name} />
                                            <Typography variant='body3Poppins' color='gray.300' fontWeight='600' fontFamily='Inter' whiteSpace='nowrap'>
                                                {item.name}
                                            </Typography>
                                            <Typography variant='body4Poppins' color='#9A6AFF' fontWeight='400' fontFamily='Inter' whiteSpace='nowrap'>
                                                {item.symbol}
                                            </Typography>
                                        </Item>
                                        :
                                        null
                                ))
                            }
                        </BoxLine>
                        <BoxLine sx={{
                            animation: 'animatedRightToLeftTransaction 150.465s infinite linear 0.5s both',
                        }}>
                            {
                                ourProjectsConfig.map((item, index) => (
                                    index >= 15 || index === 1
                                        ?
                                        <Item display='flex' gap="10px" alignItems="center" justifyContent="center" >
                                            <Box component='img' src={item.logo} alt={item.name} />
                                            <Typography variant='body3Poppins' color='gray.300' fontWeight='600' fontFamily='Inter' whiteSpace='nowrap'>
                                                {item.name}
                                            </Typography>
                                            <Typography variant='body4Poppins' color='#9A6AFF' fontWeight='400' fontFamily='Inter' whiteSpace='nowrap'>
                                                {item.symbol}
                                            </Typography>
                                        </Item>
                                        :
                                        null
                                ))
                            }
                        </BoxLine>
                    </Box>
                </WrapItems>
            </Wrapper>
            <ServiceSection>
                <Container maxWidth='lg'>
                    <FlexBox justifyContent='space-between' sx={{
                        flexDirection: {xs: 'column', md: 'row'},
                        gap:  {xs: '30px', md: '0'}
                    }}>
                        {
                            serviceConfig.map((item: any, index: number) => (
                                <ServiceItem key={item.description}>
                                    <img src={item.icon} alt={item.title.content} />
                                    <FlexBox flexDirection='column'>
                                        <Typography variant='body4Poppins' fontWeight='500' color={item.title.color}>
                                            {item.title.content}
                                        </Typography>
                                        <Typography variant='body3Poppins' fontWeight='400' color='text.primary'>
                                            {item.description}
                                        </Typography>
                                    </FlexBox>
                                </ServiceItem>
                            ))
                        }
                    </FlexBox>
                </Container>
            </ServiceSection>
        </>

    )
}

const ServiceSection = styled(Box)`
    padding-top: 55px;
    padding-bottom: 55px;
    background-color: ${(props) => ((props.theme.palette as any).extra.card.background)};
`
const FlexBox = styled(Box)`
    display: flex;
`
const ServiceItem = styled(Box)`
    display: flex;
    gap: 20px;
    max-width: 323px;
    width: 100%;
    align-items: center;
`

export default OurProjectsSection