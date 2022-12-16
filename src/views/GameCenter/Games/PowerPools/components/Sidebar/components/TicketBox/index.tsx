import { Stack, Typography, Button, styled, Box } from '@mui/material';
import Image from 'next/image';
import SwapHorizontalCircleIcon from '@mui/icons-material/SwapHorizontalCircle';
import PurchaseTicketModal from 'components/Modals/PurchaseTicketModal';
import { useState } from 'react';

interface TicketBoxProps {
  balanceAirdropTicket: number;
  balanceTicket: number;
}

const TicketBox = ({ balanceAirdropTicket, balanceTicket }: TicketBoxProps) => {
  const [open, setOpen] = useState(false);

  const configs = [
    {
      type: 0,
      balance: balanceTicket,
      label: `${balanceTicket > 1 ? 'Tickets' : 'Ticket'}`,
      icon: '/images/Tickets.png',
    },
    {
      type: 1,
      balance: balanceAirdropTicket,
      label: `${balanceTicket > 1 ? 'Airdrop tickets' : 'Airdrop ticket'}`,
      icon: '/images/TicketsAirdrop.png',
    },
  ];

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <>
      <Stack width="100%" gap="20px">
        {configs?.map((item: any, index: number) => (
          <>
            <TicketItem key={item.label}>
              <ImageBox>
                <Image src={item.icon} alt={item.label} width="80px" height="80px" />
              </ImageBox>
              <Stack alignItems="start">
                <Typography variant="body3Poppins" fontWeight="400" color="text.secondary">
                  You have:
                </Typography>
                <Stack direction="row" alignItems="baseline" gap="8px">
                  <Typography variant="h4Poppins" fontWeight="600" color="text.primary">
                    {item.balance}
                  </Typography>
                  <Typography fontSize='18px' color="primary.main">
                    {item.label}
                  </Typography>
                </Stack>
              </Stack>
            </TicketItem>
          </>
        ))}
        <PurchaseTicketButton variant="contained" color='success' fullWidth onClick={toggleOpen}>
          <Typography lineHeight="100%" color="inherit">
            <SwapHorizontalCircleIcon fontSize="inherit" color="inherit" />
          </Typography>
          <Typography variant="body3Poppins" fontWeight="500" color="inherit">
            Purchase Tickets
          </Typography>
        </PurchaseTicketButton>
      </Stack>
      <PurchaseTicketModal open={open} onDismiss={toggleOpen} />
    </>
  );
};

const TicketItem = styled(Stack)`
  width: 100%;
  flex-direction: row;
  gap: 16px;
  justify-content: flex-start;
  background-color: ${(props) => (props.theme.palette as any).extra.card.light};
  border-radius: 8px;
  overflow: hidden;
  padding: 6px;
`;
const PurchaseTicketButton = styled(Button)`
  box-shadow: none;
  padding: 10px 20px;
  gap: 10px;
  align-items: center;
  :hover {
    box-shadow: none;
    opacity: 0.8;
  }
  svg {
    width: 20px;
    height: 20px;
  }
`;
const Divider = styled(Box)`
  width: 100%;
  border-bottom: 1px solid ${(props) => (props.theme.palette as any).extra.card.light};
`;
const ImageBox = styled(Box)`
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
  border-radius: 8px;
`

export default TicketBox;
