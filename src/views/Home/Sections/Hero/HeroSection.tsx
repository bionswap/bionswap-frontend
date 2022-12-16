/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Box, Button, Container, styled, Typography, Stack } from '@mui/material';
import { MobileProp } from 'configs/Type/Mobile/type';
import { useRouter } from 'next/router';

interface HeroSectionProps extends MobileProp {}

const HeroSection = ({ isMobile, isTablet }: HeroSectionProps) => {
  const router = useRouter();
  return (
    <Wrapper>
      <Container maxWidth='xl'>
        <Stack spacing={5} textAlign='center'>
          <Stack spacing={1}>
            <Typography color='primary.main' fontSize={isMobile ? '16px' : '24px'} maxWidth='md' lineHeight='150%'>
              The Decentralized Exchange on MultiChain
            </Typography>
            <HeroText fontSize={isMobile ? '52px' : '98px'}>
              Automated Launching
            </HeroText>
            <HeroText fontSize={isMobile ? '52px' : '98px'}>
              Protocols on <HeroText
                fontSize={isMobile ? '52px' : '98px'}
                sx={{
                  background: theme => (theme.palette as any).extra.text.linear,
                  '-webkit-background-clip': 'text',
                  '-webkit-text-fill-color': 'transparent'
                }}
              >
                BionNetwork
              </HeroText>
            </HeroText>
          </Stack>
          <Typography color='text.secondary' fontSize={isMobile ? '16px' : '24px'} maxWidth='md' lineHeight='150%'>
            BionSwap is a platform that allows Builders to self-launch their projects with a Multichain Decentralize Exchange where users can trade tokens in the most optimal way.
          </Typography>
          <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
              <SwapButton
                variant='contained'
                fullWidth={isMobile}
                href='/swap'
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/swap')
                }}
              >
                Swap now
              </SwapButton>
              <SwapButton
                variant='outlined'
                fullWidth={isMobile}
                onClick={(e) => {
                  e.preventDefault();
                  window.open('https://docs.bionswap.com');
                }}
              >
                Read the docs
              </SwapButton>
          </Stack>
        </Stack>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const HeroText = styled(Typography)`
  font-weight: 700;
  line-height: 1.2;
  font-family: 'SamsungSharpSans-Bold';
`
const SwapButton = styled(Button)`
  font-size: 20px;
  padding: 10px 30px;
  border-radius: 8px;
`

export default HeroSection;
