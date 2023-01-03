import React from 'react';
import { Backdrop, Box, IconButton, MenuItem, MenuList, Modal, Stack, styled, Typography, Tab , Tabs , Button } from '@mui/material';
import { useChain, useConnect } from 'hooks';
import Image from 'next/image';
import { useState } from 'react';
import { HiX } from 'react-icons/hi';
import { getConnectorIcon } from 'utils/connectors';
import { Connector } from 'wagmi';
import useMediaQuery from 'hooks/useMediaQuery';

type Props = {
  onConnectorSelected?: (connector: Connector) => void;
  onConnectorConnected: (connector: Connector) => void;
  onClose?: () => void;
  open: boolean;
};
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function ConnectorOptionsModal({ onConnectorSelected, onConnectorConnected, onClose, open = false }: Props) {
  const { chainId } = useChain();
  const {isTablet} = useMediaQuery();
  const [selectedConnector, setSelectedConnector] = useState<Connector | null>(null);
  const {
    connect,
    connectors,
    error,
    isLoading: isConnectLoading,
    pendingConnector,
  } = useConnect({
    onSuccess: () => {
      onConnectorConnected(selectedConnector!);
    },
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`,
    };
  }
  
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
          width: isTablet ? '90%' : '808px',
          // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          borderRadius: '8px',
        }}
      >
        <HeaderBox>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography fontSize='18px' fontWeight='500' color='inherit'>
              Connect a wallet
            </Typography>
            <IconButton onClick={onClose} color='inherit'>
              <HiX />
            </IconButton>
          </Box>
        </HeaderBox>
        <Stack direction={isTablet ? 'column' : 'row'} alignItems='start' justifyContent='start'>
          <LeftBox width={isTablet ? '100%' : '40%'} order={isTablet ? '2' : '1'}>
            <StyledTab
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
            >
              {
                connectors.map((connector, index) => 
                  <Tab
                    key=''
                    icon={<Image src={getConnectorIcon(connector.id)} layout="fixed" alt="" width={24} height={24} />}
                    iconPosition="start"
                    label={connector.name}
                    {...a11yProps(index)}
                    disableRipple
                    sx={{
                      gap: '15px', minHeight: 'fit-content', padding: '16px', justifyContent: 'start'
                    }}
                  />
                )
              }
            </StyledTab>
            <Box p='16px'>
              <Typography fontSize='12px' color='text.secondary'>
                By connecting wallet, you agree to our Terms of Service
              </Typography>
            </Box>
          </LeftBox>
          <RightBox width={isTablet ? '100%' : '60%'} order={isTablet ? '1' : '2'}>
            {
              connectors.map((connector, index) => 
                <TabPanel key={`tab${index}`} value={value} index={index}>
                  <Stack spacing={2} height='100%'>
                    <Box>
                      <Image src={getConnectorIcon(connector.id)} layout="fixed" alt="" width={80} height={80} />
                    </Box>
                    <Stack>
                      <Typography sx={{
                        fontSize: '24px', fontWeight: '600',
                        color: theme => (theme.palette as any).extra.walletModal.textPrimary
                      }}>
                        {connector.name}
                      </Typography>
                      <Typography sx={{
                        color: theme => (theme.palette as any).extra.walletModal.textSecondary,
                        fontWeight: '500'
                      }}>
                        Connect to crypto wallet
                      </Typography>
                    </Stack>
                    <ConnectWalletButton
                      variant='contained'
                      onClick={() => {
                        connect({ connector, chainId });
                        setSelectedConnector(connector);
                        onConnectorSelected?.(connector);
                      }}
                    >
                      {connector.ready ? 'Connect Wallet Extension' : 'Get Wallet Extension'}
                    </ConnectWalletButton>
                  </Stack>
                </TabPanel>
              )
            }
          </RightBox>
        </Stack>
      </Wrapper>
    </Modal>
  );
}

const Wrapper = styled(Box)`
  background: ${(props: any) => (props.theme.palette as any).extra.walletModal.background};
  color: ${(props: any) => (props.theme.palette as any).extra.walletModal.textPrimary};
`;
const HeaderBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 19px 24px;
  border-bottom: 1px solid ${props => (props.theme.palette as any).extra.walletModal.divider};
  color: ${(props: any) => (props.theme.palette as any).extra.walletModal.textPrimary};
`
const StyledTab = styled(Tabs)`
    .MuiButtonBase-root {
        border-radius: 8px;
        text-transform: none;
        position: relative;
        z-index: 2;
        color: ${(props: any) => (props.theme.palette as any).extra.walletModal.textPrimary};
        font-size: 16px;
        font-weight: 400;
        text-align: left;
    }
    .MuiButtonBase-root.Mui-selected {
      color: inherit;
    }
    .MuiTabs-indicator {
        background-color: ${props => (props.theme.palette as any).extra.walletModal.hover};
        width: 100%;
        border-radius: 8px;
        z-index: 1;
    }
`
const LeftBox = styled(Box)`
    padding: 20px;
    border-right: 1px solid ${(props) => (props.theme.palette as any).extra.walletModal.divider};
    display: flex;
    flex-direction: column;
    gap: 20px;
`
const RightBox = styled(Box)`
    padding: 20px;
`
const ConnectWalletButton = styled(Button)`
    background-color: #000A0D;
    color: #fff;
    :hover {
      opacity: .8;
      background-color: #000A0D;
      box-shadow: none;
    }
`

export default ConnectorOptionsModal;
