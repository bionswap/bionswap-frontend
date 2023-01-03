/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { Box, Button, Drawer, IconButton, styled, Stack } from '@mui/material';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import { menuConfig, MENU_HEIGHT } from 'configs/menu/config';
import { useRouter } from 'next/router';
import { ConnectButton } from 'components';
import { useChain, useDarkMode, useSwitchNetwork } from 'hooks';
import ChainSelect from 'components/ConnectButton/ChainSelect';
import MobileMenu from './MobileMenu';
import useOnScroll from 'hooks/useOnScroll';
import useMediaQuery from 'hooks/useMediaQuery';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import AntSwitch from 'components/AntSwitch';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const Menu = ({ children }: any) => {
  const { isMobile, isTablet, isDesktop } = useMediaQuery();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const router = useRouter();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  // setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  // setAnchorEl(null);
  // };

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  // const { switchNetwork } = useSwitchNetwork({})
  // const {chainId , isConnected} = useChain()
  const scrollDir = useOnScroll();

  return (
    <>
      <MenuContainer>
        <StyledContained
          sx={{
            backgroundColor: (theme) => (theme.palette as any).background.default,
          }}
        >
          <Stack direction="row" gap="42px">
            <Link href="/">
              <Box sx={{ cursor: 'pointer' }} onClick={toggleDrawer('right', false)}>
                {darkMode ? (
                  <img src="/alpha.svg" alt="BionSwap" width="auto" />
                ) : (
                  <img src="/alpha-dark.svg" alt="BionSwap" width="auto" />
                )}
              </Box>
            </Link>
            {!isTablet && (
              <Stack justifyContent="start" direction="row">
                {menuConfig.map((item) => (
                  <Link key={item.label} href={item.href}>
                    <MenuItem
                      sx={{
                        ':hover': {
                          backgroundColor: (theme) => (theme.palette as any).extra.button.backgroundGreenOpacity,
                          color: 'primary.main',
                        },
                        '&.active': {
                          color: 'primary.main',
                          backgroundColor: (theme) => (theme.palette as any).extra.button.backgroundGreenOpacity,
                        },
                      }}
                      className={router.pathname == item.href ? 'active' : ''}
                    >
                      {item.label}
                    </MenuItem>
                  </Link>
                ))}
              </Stack>
            )}
          </Stack>
          <Stack direction="row" gap="16px">
            {isMobile ? (
              <>
                <Stack direction="row" spacing={1} sx={{ color: 'text.primary' }}>
                  <MdLightMode />
                  <AntSwitch defaultChecked checked={darkMode} onChange={toggleDarkMode} />
                  <MdDarkMode />
                </Stack>
                <IconButton
                  onClick={toggleDrawer('right', !state.right)}
                  sx={{
                    color: 'text.primary',
                    padding: 0,
                  }}
                >
                  {!state.right ? <HiMenu /> : <HiX />}
                </IconButton>
              </>
            ) : isTablet ? (
              <>
                <Stack direction="row" spacing={1} sx={{ color: 'text.primary' }}>
                  <MdLightMode />
                  <AntSwitch defaultChecked checked={darkMode} onChange={toggleDarkMode} />
                  <MdDarkMode />
                </Stack>
                <ConnectButton />
                <ChainSelect />
                <IconButton
                  onClick={toggleDrawer('right', !state.right)}
                  sx={{
                    color: '#fff',
                  }}
                >
                  {!state.right ? <HiMenu /> : <HiX />}
                </IconButton>
              </>
            ) : (
              <>
                <Stack direction="row" spacing={1} sx={{ color: 'text.primary' }}>
                  <MdLightMode />
                  <AntSwitch defaultChecked checked={darkMode} onChange={toggleDarkMode} />
                  <MdDarkMode />
                </Stack>
                <ConnectButton />
                <ChainSelect />
              </>
            )}
          </Stack>
        </StyledContained>
        {isMobile && (
          <BottomContainer>
            <Stack direction="row" spacing={1}>
              <ChainSelect />
              <ConnectButton />
            </Stack>
          </BottomContainer>
        )}
        <Drawer anchor={'right'} open={state['right']} onClose={toggleDrawer('right', false)}>
          <MobileMenu anchor="right" toggleDrawer={toggleDrawer} />
        </Drawer>
      </MenuContainer>
      <Box>{children}</Box>
    </>
  );
};

const MenuContainer = styled(Box)`
  position: fixed;
  z-index: ${(prop) => prop.theme.zIndex.drawer + 1};
  top: 0;
  left: 0;
  width: 100%;
`;
const StyledContained = styled(Box)`
  padding: 0 24px;
  display: flex;
  width: 100%;
  height: ${MENU_HEIGHT}px;
  align-items: center;
  justify-content: space-between;
`;
const LaunchpadButton = styled(Button)`
  border-radius: 4px;
  box-shadow: none;
  text-transform: none;
  font-family: inherit;
  min-width: fit-content;
  font-weight: 500;
  align-items: center;
  height: 40px;
  gap: 10px;
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.text.primary};
  transition: 0.15s ease-in;
  :hover {
    background-color: ${(props) => props.theme.palette.secondary.main};
    box-shadow: none;
  }
`;
const BottomContainer = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: ${(prop) => prop.theme.zIndex.drawer + 1};
  width: 100%;
  background-color: ${(props) => (props.theme.palette as any).background.default};
  color: ${(props) => props.theme.palette.text.primary};
  padding: 16px 24px;
  border-top: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider}};
`;
const MenuItem = styled(Box)`
  color: ${(props) => props.theme.palette.text.secondary};
  font-size: 14px;
  transition: 0.12s ease-in;
  padding: 8px 15px;
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
`;

export default Menu;
