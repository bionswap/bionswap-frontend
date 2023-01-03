import Page from 'components/Page';
import { ChainId } from '@bionswap/core-sdk';
import { useChain, useSwitchNetwork } from 'hooks';
import React from 'react';
import Contact from './components/Contact/Contact';
import Hero from './components/Hero/Hero';
import LaunchPadSection from './LaunchPadSection';
import NotSupportSection from 'components/NotSupportSection';

const Launchpad = () => {
  const { chainId } = useChain();

  return (
    <Page
      sx={{
        backgroundColor: theme => (theme.palette as any).extra.background.alt
      }}
    >
      {/* <Hero /> */}
      {ChainId.BSC_TESTNET === chainId ? (
        <LaunchPadSection chainId={chainId} />
      ) : (
        <NotSupportSection />
      )}
      <Contact />
    </Page>
  );
};

export default Launchpad;
