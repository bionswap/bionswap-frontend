import { ChainId } from '@bionswap/core-sdk';
import { useSwitchNetwork } from 'hooks';
import React from 'react';
import { Container, Typography, Box, Button, Stack , styled } from '@mui/material';
import { CHAIN_INFO_MAP } from 'configs/chain';
import Image from 'next/image';
import { getChainIcon } from 'utils/chains';
import Page from 'components/Page';
import useMediaQuery from 'hooks/useMediaQuery';

const NotSupportSection = () => {
  const { switchNetwork } = useSwitchNetwork({});
  const {isMobile} = useMediaQuery()

  return (
    <Page>
      <Container>
        <Stack p='8rem 0' textAlign="center" spacing={4}>
          <Stack>
            <Typography fontSize='20px' fontWeight='500' textTransform='uppercase' color='primary.main'>
              This chain is not supported
            </Typography>
            <Typography fontSize={isMobile ? '32px' : '42px'} fontWeight='700'>
              This feature is not yet supported on this chain for now. Please switch to these supported chain.
            </Typography>
          </Stack>
          <Stack direction='row' width='100%' spacing={2}>
            {Object.entries(CHAIN_INFO_MAP).map(([, chain]) =>
              chain.id === ChainId.BSC_TESTNET ? (
                <StyledButton
                  variant='contained'
                  key={chain.id}
                  onClick={() => {
                    switchNetwork?.(chain?.id);
                  }}
                >
                  <Box>
                    <Image src={getChainIcon(chain.id)?.iconUrl} layout="fixed" alt="" width={24} height={24} />
                  </Box>
                  <Typography color='text.primary'>
                    {chain.name}
                  </Typography>
                </StyledButton>
              ) : (
                <></>
              ),
            )}
          </Stack>
        </Stack>
      </Container>
    </Page>
  );
};

const StyledButton = styled(Button)`
  background-color: ${props => (props.theme.palette as any).extra.card.light};
  box-shadow: none;
  padding: 12px 20px;
  gap: 10px;
  :hover {
    background-color: ${props => (props.theme.palette as any).extra.card.hover};
    box-shadow: none;
  }
`

export default NotSupportSection;
