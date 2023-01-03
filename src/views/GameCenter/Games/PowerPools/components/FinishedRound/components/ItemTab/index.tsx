import { styled, Button, Typography } from '@mui/material';
import { useSingleCallResult } from 'hooks';

const ItemTab = ({ contract, index, poolIndex, handleChangePool }: any) => {
  const totalSlots = Number(useSingleCallResult(contract, 'totalSlots')?.result?.[0] || 0);

  return (
    <Item className={index === poolIndex ? 'active' : ''} onClick={() => handleChangePool(index)}>
      <Typography variant="body3Poppins" fontWeight="600" color="gray.500">
        x{totalSlots}
      </Typography>
    </Item>
  );
};

const Item = styled(Button)`
  background-color: #0c1620;
  border-radius: 8px;
  padding: 6px 25px;

  &.active {
    background: ${(props) => (props.theme.palette as any).extra.button.backgroundGreenOpacity};

    span {
      color: ${(props) => props.theme.palette.primary.main};
    }
  }
`;

export default ItemTab;
