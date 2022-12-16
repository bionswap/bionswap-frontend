import { Box, Button, Divider, Drawer, Stack, styled , Typography } from '@mui/material';
import { useAccount, useChain, useNativeCurrencyBalances , useDisconnect } from 'hooks';
import useMediaQuery from 'hooks/useMediaQuery';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getConnectorIcon } from 'utils/connectors';
import { shortenAddress } from 'utils/format';
import { Chain, Connector } from 'wagmi';
import ChainOptionsModal from './ChainOptionsModal';
import ChainSelect from './ChainSelect';
import ConnectorOptionsModal from './ConnectorOptionsModal';
import SidebarProfileMenu from './SidebarProfileMenu';
import {RiWallet3Fill} from 'react-icons/ri'
import { useRouter } from 'next/router';
import * as HoverCard from '@radix-ui/react-hover-card';
import { useAppDispatch, useAppSelector } from 'state';
import { getUserInfo } from 'api/user';
import {RiArrowRightLine , RiLogoutBoxRLine} from 'react-icons/ri'
import { logOut } from 'state/auth/actions';
import ProfileModal from './ProfileModal';

type Props = {};

const ConnectButton = (props: Props) => {
  const {isMobile , isTablet} = useMediaQuery();
  const [openConnectorsModal, setOpenConnectorsModal] = useState(false);
  const [openChainsModal, setOpenChainsModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const { chainId } = useChain();
  const { address, connector: activeConnector } = useAccount();
  const balance = useNativeCurrencyBalances(address ? [address] : [])?.[address ?? ''];
  const router = useRouter()

  const dispatch = useAppDispatch();
  const { disconnect } = useDisconnect({
    onSuccess: () => {
      dispatch(logOut());
    },
  });

  const [userInfo, setUserInfo] = useState<any>(null);
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const getUserInformation = async () => {
      try {
        if (!accessToken) return;

        const rest = await getUserInfo();
        setUserInfo(rest);
      } catch (error) {
        console.log('error====>', error);
      }
    };

    getUserInformation();
  }, [address, accessToken]);

  const [profileSlide, setProfileSlide] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setProfileSlide(open);
  };

  // const handleChainSwitched = (chain: Chain) => {
  //   setOpenChainsModal(false);
  //   gtag('event', 'Switch', {
  //     event_category: 'Chain',
  //     event_label: chain.name,
  //   });
  // };

  // const handleChainSelected = () => {
  //   setOpenChainsModal(false);
  // };

  const handleConnectorConnected = (connector: Connector) => {
    setOpenConnectorsModal(false);
    gtag('event', 'Connector Connected', {
      event_category: 'Connector',
      event_label: connector.name,
    });
  };
  
  return (
    <>
      {!address ? (
        <ConnectWalletButton onClick={() => setOpenConnectorsModal(true)} variant="contained" fullWidth>
          <Typography sx={{fontSize: '14px', color: 'inherit', fontWeight: '500'}}>Connect Wallet</Typography>
        </ConnectWalletButton>
      ) : (
        <ProfileButton
          onClick={() => setOpenProfileModal(true)}
          // onClick={toggleDrawer(!profileSlide)}
          // href='/dashboard/overview'
          variant="contained"
          fullWidth
        >
          <Box>
            <RiWallet3Fill/>
          </Box>
          <Typography fontSize='14px' fontWeight='500' color='inherit'>{shortenAddress(address ?? '')}</Typography>
          {/* {activeConnector && (
            <Image src={getConnectorIcon(activeConnector.id)} layout="fixed" alt="" width={18} height={18} />
          )} */}
        </ProfileButton>
      )}

      {/* <ChainOptionsModal
        open={openChainsModal}
        onClose={() => setOpenChainsModal(false)}
        onChainSelected={handleChainSelected}
        onChainSwitched={handleChainSwitched}
      /> */}

      <ConnectorOptionsModal
        onClose={() => setOpenConnectorsModal(false)}
        open={openConnectorsModal}
        onConnectorConnected={handleConnectorConnected}
      />
      <ProfileModal
        onClose={() => setOpenProfileModal(false)}
        open={openProfileModal}
      />
      {/* <Drawer anchor="right" open={profileSlide} onClose={toggleDrawer(false)}>
        <SidebarProfileMenu toggleDrawer={toggleDrawer} address={address} balance={balance} />
      </Drawer> */}
    </>
  );
};



const ConnectWalletButton = styled(Button)`
  border-radius: 4px;
  text-transform: none;
  padding: 6px 25px;
  align-items: center;
  border: 1.5px solid transparent;
  background: ${(props) => (props.theme.palette as any).extra.button.linear};
  color: ${(props) => props.theme.palette.background.default};
  transition: 0.12s ease-in;
  :hover {
    background: ${(props) => (props.theme.palette as any).extra.button.linear};
    color: ${(props) => props.theme.palette.background.default};
    box-shadow: none;
  }
`;

const ProfileButton = styled(Button)`
  border-radius: 4px;
  padding: 6px 20px;
  min-height: 38px;
  border: 1.5px solid transparent;
  background-color: ${props => (props.theme.palette as any).extra.button.backgroundGreenOpacity};
  color: ${props => props.theme.palette.primary.main};
  transition: 0.12s ease-in;
  gap: 10px;
  line-height: 1;
  :hover {
    border-color: ${props => (props.theme.palette as any).extra.card.light};
    background-color: ${props => (props.theme.palette as any).extra.button.backgroundGreenOpacity};
    box-shadow: none;
  }
`;

const ProfileDropDown = styled(Box)`
  border-radius: 8px;
  padding: 16px;
  background-color: white;
  width: 250px;
  box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  animation-duration: 0.6s;
  animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform, opacity;
  // [data-side='top'] {
  //   animation-name: slideDownAndFade;
  // }
  // [data-side='right'] {
  //   animation-name: slideLeftAndFade;
  // }
  // [data-side='bottom'] {
  //   animation-name: slideUpAndFade;
  // }
  // [data-side='left'] {
  //   animation-name: slideRightAndFade;
  // }
`
const ProfileAltButton = styled(Button)`
  color: #000;
  gap: 10px;
  justify-content: start;
  font-size: 16px;
  :hover {
    background-color: ${props => (props.theme.palette as any).extra.walletModal.hover};
  }
`


export default ConnectButton;
