/* eslint-disable @next/next/no-img-element */
import React from 'react'
import {
    Box,
    Container,
    Link,
    Stack,
    styled,
    SvgIcon,
    Typography,
} from '@mui/material'
import { footerMenuConfig, socialsConfig } from 'configs/menu/config'
import { useRouter } from 'next/router'
import useMediaQuery from 'hooks/useMediaQuery'
import { useDarkMode } from 'hooks'


const Footer = ({ children }: any) => {
    const {isMobile} = useMediaQuery()
    const router = useRouter();
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <Wrapper>
            <Container maxWidth='xl'>
                <WrapMenuItem sx={{
                    flexDirection: isMobile ? 'column' : 'row'
                }}>
                    <Stack spacing={2} alignItems='start'>
                        <Link href='/'>
                            {
                                darkMode ?
                                <img src='/alpha.svg' alt='BionSwap' width='200px' />
                                :
                                <img src='/alpha-dark.svg' alt='BionSwap' width='200px' />
                            }
                        </Link>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                fontSize: '14px',
                                maxWidth: '300px'
                            }}>
                            BionSwap is a platform that allows Project Owners to self-launch their projects and a Multichain Decentralize Exchange.
                        </Typography>
                        <Box gap={2} display="flex" alignItems="center" sx={{
                            color: 'text.secondary'
                        }}>
                            {
                                socialsConfig.map((item, index) => (
                                    <Box
                                        key={item.label}
                                        component='a'
                                        href={item.href}
                                        onClick={(e: any) => {
                                            e.preventDefault();
                                            router.push(item.href);
                                        }}
                                        sx={{
                                            '&:hover':{
                                                color: 'primary.main',
                                                transform: 'translateY(-5px)'
                                            }
                                        }}
                                    >
                                        {item.icon}
                                    </Box>
                                ))
                            }
                        </Box>
                    </Stack>
                    {
                        footerMenuConfig.map(footer =>
                            <MenuItems key={footer.title}>
                                <Typography fontSize='18px' color='text.primary' fontWeight='600'>
                                    {footer.title}
                                </Typography>
                                {
                                    footer.items.map(item => (
                                        <Typography
                                            component='a'
                                            key={item.label}
                                            href={item.href}
                                            onClick={(e: any) => {
                                                e.preventDefault();
                                                router.push(item.href);
                                            }}
                                            sx={{
                                                color: 'text.secondary',
                                                fontSize: '14px',
                                                '&:hover':{
                                                    color: 'primary.main',
                                                    transform: 'translateX(5px)'
                                                }
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                    ))
                                }
                            </MenuItems>
                        )
                    }
                </WrapMenuItem>
            </Container>
        </Wrapper>
    )
}

const Wrapper = styled(Box)`
    width: 100%;
    background-color: ${(props) => props.theme.palette.background.default};
    display: flex;
    padding: 7rem 0;
`
const WrapMenuItem = styled(Box)`
    display: flex;
    align-items: start;
    gap: 40px;
    justify-content: space-between;
`
const MenuItems = styled(Box)`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
    * {
        transition: .1s ease-in;
    }
`

export default Footer