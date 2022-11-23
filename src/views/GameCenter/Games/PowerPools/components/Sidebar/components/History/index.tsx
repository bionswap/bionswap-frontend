import { styled, Box, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Stack } from '@mui/material';
import { getHistoryGameSlot } from 'api/gamecenter';
import { useState, useEffect } from 'react';
import HistoryItem from './components/HistoryItem';

const configs = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Claimed',
    value: 'claimed',
  },
  {
    label: 'Unclaimed',
    value: 'unclaimed',
  },
];

interface historyProp {
  chainId: number | undefined,
  account: string | undefined,
}

const History = ({chainId, account}: historyProp) => {
  const [dataHistory, setDataHistory] = useState([]);
  const [filter, setFilter] = useState('all')

  const getHistory = async () => {
    try {
      const res = await getHistoryGameSlot(String(chainId || ''), account, filter)
      setDataHistory(res?.data)
      console.log("🚀 ~ file: index.tsx ~ line 32 ~ getHistory ~ res", res)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    getHistory()
  }, [])

  return (
    <WrapBox>
      <Typography variant="body2Poppins" fontWeight="500" color="background.paper">
        History
      </Typography>
      <FormControl>
        <RadioGroup row>
          {configs.map((item: any) => (
            <FormControlLabel key={item.value} value={item.value} control={<Radio />} label={item.label} />
          ))}
        </RadioGroup>
      </FormControl>
      <Stack gap='10px'>
        {
          dataHistory?.map((item: any) => (
            <>
            <HistoryItem  key={item?._id} />
            <Line />
            </>
          ))
        }
      </Stack>
    </WrapBox>
  );
};

const WrapBox = styled(Box)``;
const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.palette.gray[800]};
`

export default History;
