import React from 'react';
import { Box, Button, styled, SvgIcon, Typography, Link } from '@mui/material';
import { MENU_HEIGHT } from 'configs/menu/config';
import { HiChevronDown } from 'react-icons/hi';
import { BsFillCaretDownFill } from 'react-icons/bs';
import { IoPower } from 'react-icons/io5';
import Image from 'next/image';
import { shortenAddress } from 'utils/format';
import { useChain, useDisconnect } from 'hooks';
import { useAppDispatch } from 'state';
import { logOut } from 'state/auth/actions';
import tabsConfig from 'views/Dashboard/tabsConfig';
import { useRouter } from 'next/router';

const SidebarProfileMenu = ({ toggleDrawer, address, balance }: any) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { disconnect } = useDisconnect({
    onSuccess: () => {
      dispatch(logOut());
    },
  });
  const { chainId } = useChain();

  const Wrapper = styled(Box)`
    width: 350px;
    padding-top: ${MENU_HEIGHT}px;
    background-color: ${props => (props.theme.palette as any).extra.card.background};
    border-left: 1px solid ${props => (props.theme.palette as any).extra.card.divider};
    height: 100vh;
  `;

  return (
    <Wrapper>
      <Flex p="16px" flexDirection="column" gap="24px">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Flex
            sx={{
              gap: '10px',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.preventDefault();
              router.push('/dashboard');
            }}
          >
            <Image src="/icons/dashboard/default_avatar.svg" alt="" width="30px" height="30px" />
            <Typography sx={{ fontSize: '14px', fontWeight: '500', lineHeight: '1' }}>My Wallet</Typography>
            <HiChevronDown />
          </Flex>
          <Box>
            <Typography variant="body4Poppins" sx={{ color: 'gray.400' }}>
              {shortenAddress(address ?? '')}
            </Typography>
          </Box>
        </Flex>
        <WalletBox>
          <div className="inside">
            <Card>
              <Box>
                <Typography variant="caption6Poppins" sx={{ color: 'inherit' }}>
                  Your Balance
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6Samsung" sx={{ color: 'inherit' }}>
                  {balance ? `${balance.toFixed(3)} ${balance.currency.symbol}` : 'Loading...'}
                </Typography>
              </Box>
            </Card>
          </div>
          <div className="outside">
            <BuyCryptoButton
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                router.push('/swap');
              }}
            >
              Buy crypto
              <BsFillCaretDownFill />
            </BuyCryptoButton>
          </div>
        </WalletBox>
        <Flex flexDirection="column" gap="5px" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          {tabsConfig.map((item) => (
            <Item
              key=""
              href={`${item.href}`}
              onClick={(e) => {
                e.preventDefault();
                router.push(`${item.href}`);
              }}
            >
              <Flex alignItems="center" gap="10px">
                <SvgIcon component={item.icon} />
                <Typography variant="body3Poppins" sx={{ color: 'inherit' }}>
                  {item.label}
                </Typography>
              </Flex>
            </Item>
          ))}
        </Flex>
        <Box onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <DisconnectButton
            variant="text"
            onClick={() => {
              disconnect();
            }}
          >
            <IoPower />
            Disconnect
          </DisconnectButton>
        </Box>
      </Flex>
    </Wrapper>
  );
};

const Flex = styled(Box)`
  display: flex;
`;
const DisconnectButton = styled(Button)`
  color: ${(prop) => prop.theme.palette.error.main};
  gap: 10px;
  width: 100%;
  padding: 12.5px 16px;
  svg {
    width: 18px;
    height: 18px;
  }
  :hover {
    background-color: rgba(249, 50, 50, 0.2);
  }
`;
const Item = styled(Button)`
  color: ${(prop) => prop.theme.palette.text.secondary};
  transition: 0.12s ease-in;
  justify-content: start;
  padding: 12.5px 16px;
  svg {
    color: inherit;
    width: 20px;
    height: 20px;
  }
  :hover {
    color: ${(prop) => prop.theme.palette.text.primary};
  }
`;

const WalletBox = styled(Box)`
  width: 100%;
  border-radius: 16px;
  border: 1px solid ${props => (props.theme.palette as any).extra.card.divider};
  background: ${(prop) => (prop.theme.palette as any).extra.card.background};
  margin-top: 30px;
  .inside {
    border-bottom: 1px solid ${props => (props.theme.palette as any).extra.card.divider};
    padding: 0 15px;
    // :before {
    //     content: "";
    //     position: absolute;
    //     z-index: 2;
    //     top: 0;
    //     width: 100%;
    //     height: 40%;
    //     border-bottom: 1px solid ${props => (props.theme.palette as any).extra.card.divider};
    //     border-bottom-left-radius: 50%;
    //     border-bottom-right-radius: 50%;
    // }
  }
  .outside {
    padding: 15px;
  }
`;
const Card = styled(Box)`
  // background-color: ${(prop) => prop.theme.palette.primary.main};
  background-color: #ffd673;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  width: 100%;
  position: relative;
  z-index: 2;
  margin-top: -30px;
  height: 80px;
  color: ${(prop) => prop.theme.palette.text.primary};
  padding: 15px 10px;
`;
const BuyCryptoButton = styled(Button)`
  background: ${(prop) => (prop.theme.palette as any).extra.card.background};
  border-radius: 4px;
  border: 1px solid ${props => (props.theme.palette as any).extra.card.divider};
  width: 100%;
  color: ${(prop) => prop.theme.palette.text.primary};
  justify-content: space-between;
  font-weight: 300;
  font-size: 13px;
  :hover {
    background: ${(prop) => (prop.theme.palette as any).extra.card.background};
    opacity: 0.8;
  }
`;

export default SidebarProfileMenu;
