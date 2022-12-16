import React from 'react';
import { Box, Stack, styled } from '@mui/material';
import ProfileBox from './components/ProfileBox';
import TicketBox from './components/TicketBox';
import History from './components/History';
import { useBionTicket } from 'hooks/useContract';
import { useAccount, useChain, useSingleCallResult } from 'hooks';

const Sidebar = () => {
  const bionTicketContract = useBionTicket();
  const { account, chainId } = useChain();

  const balanceOfAirdropTicket = Number(
    useSingleCallResult(bionTicketContract, 'balanceOf', [account, 1])?.result?.[0] || 0,
  );
  const balanceOfNormalTicket = Number(
    useSingleCallResult(bionTicketContract, 'balanceOf', [account, 0])?.result?.[0] || 0,
  );

  return (
    <Wrapper>
      <Stack justifyContent='start' alignItems='start' spacing={2}>
        <ProfileBox />
        <TicketBox balanceTicket={balanceOfNormalTicket} balanceAirdropTicket={balanceOfAirdropTicket} />
        <History account={account} chainId={chainId} />
      </Stack>
    </Wrapper>
  );
};

const Wrapper = styled(Box)`
  min-width: 418px;
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
  height: 100%;
  min-height: inherit;
  padding: 25px;
`;

export default Sidebar;
