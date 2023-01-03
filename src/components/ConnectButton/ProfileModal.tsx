/* eslint-disable @next/next/no-img-element */
import {
  Backdrop,
  Box,
  Divider,
  IconButton,
  MenuItem,
  MenuList,
  Modal,
  Skeleton,
  styled,
  Typography,
  Stack,
  Button
} from '@mui/material';
import { useBalance, useNativeCurrencyBalances } from 'hooks';
import Image from 'next/image';
import { HiX } from 'react-icons/hi';
import {RiShareBoxLine} from 'react-icons/ri'
import {IoWalletOutline , IoLogOutOutline} from 'react-icons/io5'
import { useAccount, useDisconnect } from 'wagmi';
import { getConnectorIcon } from 'utils/connectors';
import { shortenAddress } from 'utils/format';
import profileMenu from './profileConfig';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'state';
import { logOut } from 'state/auth/actions';
import useMediaQuery from 'hooks/useMediaQuery';
import { useEffect, useState } from 'react';
import { getUserInfo } from 'api/user';

type Props = {
  onClose?: () => void;
  open: boolean;
};

const ProfileModal = ({ onClose, open = false }: Props) => {
  const dispatch = useAppDispatch();
  const { address, connector: activeConnector } = useAccount();
  const {isMobile} = useMediaQuery();
  const { disconnect } = useDisconnect({
    onSuccess: () => {
      dispatch(logOut());
    },
  });

  const balance = useNativeCurrencyBalances(address ? [address] : [])?.[address ?? ''];

  const router = useRouter();

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

  return (
    <Modal
      onClose={onClose}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Wrapper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'text.primary',
          minWidth: isMobile ? '90%' : '448px',
          // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        }}
      >
        <Stack direction='row' justifyContent="space-between" alignItems="start" p='0 5px'>
          <Typography>
            Account
          </Typography>
          <IconButton onClick={onClose} sx={{ color: 'text.primary', padding: '0', ':hover':{backgroundColor: 'transparent'} }}>
            <HiX />
          </IconButton>
        </Stack>
        <WalletDetail p='16px' spacing={2}>
          <Stack direction='row' width='100%' justifyContent='space-between'>
            {activeConnector
              ?
                <Typography color="text.secondary" fontSize="12px">
                  Connected with {activeConnector.name}
                </Typography>
              :
              <Skeleton width='140px' />
            }
            <ChangeWalletButton
              variant='contained'
            >
              Change
            </ChangeWalletButton>
          </Stack>
          <Stack direction="row" gap="10px" width='100%' justifyContent='start'>
            <Stack>
              <img
                src={
                  userInfo?.avatar?.imageURL
                    ? `/images/bitendoGameboy/${userInfo?.avatar?.typeId}.svg`
                    : '/images/bitendoGameboy/Default.svg'
                }
                alt=""
                width="40px"
                height="40px"
              />
            </Stack>
            <Typography color='text.primary' fontWeight='500' fontSize='18px'>{shortenAddress(address ?? '')}</Typography>
          </Stack>
          <Stack direction='row' justifyContent='start' width='100%' spacing={2}>
            <Typography fontSize='12px' color='text.secondary'>
              Balance: <Typography fontSize='12px' color='text.primary'>{balance ? `${balance.toFixed(3)} ${balance.currency.symbol}` : 'Loading...'}</Typography>
            </Typography>
            <Stack direction='row' justifyContent='start' color='primary.main' spacing={0.5}>
              <RiShareBoxLine/>
              <Typography fontSize='12px' color='primary.main'>
                View on explorer
              </Typography>
            </Stack>
          </Stack>
        </WalletDetail>
        <WalletDetail divider={<Divider flexItem/>} onClick={onClose}>
          <Button
            sx={{
              p: '16px',
              width: '100%',
              borderRadius: '7px 7px 0 0',
              color: theme => theme.palette.text.secondary,
              ':last-child': {
                borderBottom: 'none',
              },
              ':hover':{
                color: theme => theme.palette.primary.main,
                backgroundColor: theme => (theme.palette as any).extra.button.backgroundGreenOpacity
              }
            }}
            onClick={(e) => {
              e.preventDefault();
              router.push('/dashboard');
            }}
          >
            <Stack direction='row' width='100%' justifyContent='start' spacing={1}>
              <Stack color='inherit'>
                <IoWalletOutline/>
              </Stack>
              <Typography fontSize='14px' color='inherit'>
                Overview
              </Typography>
            </Stack>
          </Button>
          <Button
            sx={{
              p: '16px',
              width: '100%',
              borderRadius: '0 0 7px 7px',
              color: theme => theme.palette.text.secondary,
              ':last-child': {
                borderBottom: 'none',
              },
              ':hover':{
                color: theme => theme.palette.primary.main,
                backgroundColor: theme => (theme.palette as any).extra.button.backgroundGreenOpacity
              }
            }}
            onClick={() => disconnect()}
          >
            <Stack direction='row' width='100%' justifyContent='start' spacing={1}>
              <Stack color='inherit'>
                <IoLogOutOutline/>
              </Stack>
              <Typography fontSize='14px' color='inherit'>
                Disconnect
              </Typography>
            </Stack>
          </Button>
        </WalletDetail>
      </Wrapper>
    </Modal>
  );
};
const Wrapper = styled(Box)`
  background: ${(props: any) => (props.theme.palette as any).extra.card.background};
  border: 1px solid ${props => (props.theme.palette as any).extra.card.divider};
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-radius: 12px;
  padding: 16px;
`;
const WalletDetail = styled(Stack)`
  border-radius: 8px;
  border: 1px solid ${props => (props.theme.palette as any).extra.card.divider};
  width: 100%;
`
const ChangeWalletButton = styled(Button)`
  font-size: 12px;
  border-radius: 999px;
  background-color: ${props => (props.theme.palette as any).extra.button.backgroundGreenOpacity};
  color: ${props => props.theme.palette.primary.main};
  box-shadow: none;
  padding: 5px 10px;
  :hover {
    background-color: ${props => (props.theme.palette as any).extra.button.backgroundGreenOpacity};
    color: ${props => props.theme.palette.primary.main};
    box-shadow: none;
  }
`

export default ProfileModal;
