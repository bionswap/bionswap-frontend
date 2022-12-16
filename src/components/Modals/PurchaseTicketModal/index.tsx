import { Stack, Typography, styled, Box, OutlinedInput, Button, IconButton } from '@mui/material';
import BaseModal from 'components/BaseModal';
import PrimaryLoadingButton from 'components/PrimaryLoadingButton';
import { useSingleCallResult } from 'hooks';
import { useBionTicket } from 'hooks/useContract';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { toastError } from 'hooks/useToast';
import BuyTicket from './components/BuyTicket';
import SellTicket from './components/SellTicket';

const tickets = [
  {
    value: '1',
    icon: '/images/TicketsAirdrop.png',
  },
  {
    value: '0',
    icon: '/images/Tickets.png',
  },
];

const configs = [
  {
    id: 1,
    label: 'Buy Ticket',
  },
  {
    id: 2,
    label: 'Sell Ticket',
  },
];

const PurchaseTicketModal = ({
  open,
  onDismiss,
  account,
  totalSlots,
  filledSlots,
  parentContract,
  currentRoundId,
  shareOf,
}: any) => {
  const [tab, setTab] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [ticketType, setTicketType] = useState('1');
  const [inputTicket, setInputTicket] = useState(0);
  const [balanceOf, setBalanceOf] = useState(0);
  const [winRate, setWinRate] = useState<any>('--');
  const [avaiableSlot, setAvaiableSlot] = useState(0);
  const bionTicketContract = useBionTicket();

  const balanceAirdropTicket = Number(
    useSingleCallResult(bionTicketContract, 'balanceOf', [account, tickets[0].value])?.result?.[0] || 0,
  );
  const balanceNormalTicket = Number(
    useSingleCallResult(bionTicketContract, 'balanceOf', [account, tickets[1].value])?.result?.[0] || 0,
  );
  const isApprovedForAll =
    useSingleCallResult(bionTicketContract, 'isApprovedForAll', [account, parentContract?.address])?.result?.[0] ||
    false;

  const totalDeposit = shareOf;

  //   Set balanceOf following ticketType - 0:AirdropTicket - 1:NormalTicket -
  useEffect(() => {
    if (ticketType === '1') {
      setBalanceOf(balanceAirdropTicket);
    } else if (ticketType === '0') {
      setBalanceOf(balanceNormalTicket);
    }
  }, [ticketType, open]);

  //   Set win rate
  useEffect(() => {
    if (inputTicket) {
      setWinRate((inputTicket * 100) / totalSlots);
    } else {
      setWinRate('--');
    }
  }, [inputTicket, totalSlots]);

  //   Set Avaiable Slot
  useEffect(() => {
    setAvaiableSlot(totalSlots - filledSlots);
  }, [totalSlots, filledSlots]);

  const changeTab = (id: number) => {
    setTab(id);
  };

  return (
    <>
      <BaseModal
        open={open}
        sx={{
          padding: '0',
          maxWidth: '516px',
          width: '100%',
          height: 'auto',
          maxHeight: '590px',
          overflowY: 'auto',
        }}
      >
        <IconButton onClick={onDismiss} sx={{ position: 'absolute', right: 12, top: 12}}>
          <CloseIcon />
        </IconButton>
        <Box>
          <Stack flexDirection="row">
            {configs?.map((item: any) => (
              <TabHead key={item.label} className={tab === item.id ? 'active' : ''} onClick={() => changeTab(item.id)}>
                <Typography
                  variant="body3Poppins"
                  lineHeight="18px"
                  fontWeight="500"
                  color={tab === item.id ? 'primary.main' : 'gray.500'}
                >
                  {item.label}
                </Typography>
              </TabHead>
            ))}
          </Stack>
          <WrapBox>
            {tab === 1 && <BuyTicket />}
            {tab === 2 && <SellTicket />}
          </WrapBox>
        </Box>
      </BaseModal>
    </>
  );
};

const TabHead = styled(Stack)`
  width: 50%;
  height: 65px;
  cursor: pointer;

  &.active {
    background: #004444;
  }
`;

const WrapBox = styled(Box)`
  padding: 24px 20px;
`;
const InputCustom = styled(OutlinedInput)`
  fieldset {
    display: none;
  }

  input {
    padding: 0;
    font-weight: 500;
    font-size: 28px;
    line-height: 45px;
    color: ${(props) => props.theme.palette.gray[200]};
    font-family: 'SamsungSharpSans-Bold';
  }
`;
const ButtonItem = styled(Button)`
  border: 1px solid rgba(141, 241, 250, 0.5);
  border-radius: 8px;
  max-width: 72px;
  width: 100%;
  height: 29px;
`;

export default PurchaseTicketModal;
