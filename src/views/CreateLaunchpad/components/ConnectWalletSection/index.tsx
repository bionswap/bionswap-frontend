import React, { useState } from 'react';
import { Container, Typography, Box, styled, Button, useMediaQuery } from '@mui/material';
import { ConnectButton } from 'components';
import ConnectorOptionsModal from 'components/ConnectButton/ConnectorOptionsModal';

const ConnectWalletSection = () => {
  const [openConnectorsModal, setOpenConnectorsModal] = useState(false);
  const isMobile = useMediaQuery('(max-width:1224px)');

  const handleConnectorConnected = () => {
    setOpenConnectorsModal(false);
  };

  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          minHeight: '30vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h5Samsung" textAlign="center">
          Please Connect Wallet before create launchpad
        </Typography>
        <ConnectWalletButton onClick={() => setOpenConnectorsModal(true)} variant="contained" fullWidth={isMobile}>
          <Box>Connect Wallet</Box>
        </ConnectWalletButton>
      </Box>
      <ConnectorOptionsModal
        onClose={() => setOpenConnectorsModal(false)}
        open={openConnectorsModal}
        onConnectorConnected={handleConnectorConnected}
      />
    </Container>
  );
};

const ConnectWalletButton = styled(Button)`
  border-radius: 4px;
  min-width: fit-content;
  padding: 8.5px 48px;
  box-shadow: none;
  text-transform: none;
  font-family: inherit;
  font-weight: 500;
  align-items: center;
  min-height: 41px;
  background-color: ${(props) => (props.theme.palette as any).extra.button.backgroundGreenOpacity};
  color: ${(props) => props.theme.palette.primary.main};
  transition: 0.15s ease-in;
  line-height: 1;
  svg {
    width: 20px;
    height: 20px;
  }
  :hover {
    background-color: ${(props) => (props.theme.palette as any).extra.button.backgroundGreenOpacity};
    box-shadow: none;
  }
`;

export default ConnectWalletSection;
