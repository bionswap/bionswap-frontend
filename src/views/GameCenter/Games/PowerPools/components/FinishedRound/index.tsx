import { Typography, styled, Box, Stack } from '@mui/material';
import { useState } from 'react';
import ItemTab from './components/ItemTab';
import ResultBox from './components/ResultBox';

interface FinishedRoundProp {
  contracts: any;
}

const FinishedRound = ({ contracts }: FinishedRoundProp) => {
  const [poolIndex, setPoolIndex] = useState(0);

  const onChangePool = (index: number) => {
    setPoolIndex(index);
  };

  return (
    <Stack width="100%" gap="25px">
      <Typography variant="h3Samsung" fontWeight="500" color="success.main">
        Finished round
      </Typography>
      <Stack width="100%">
        {contracts?.map((item: any) => (
          <ItemTab key={item.contract} contract={item.contract} index={item.index} poolIndex={poolIndex} handleChangePool={onChangePool} />
        ))}
      </Stack>
      <Box width="100%">
        {contracts?.map(
          (item: any) => poolIndex === item.index && <ResultBox key={item.label} parentContract={item.contract} />,
        )}
      </Box>
    </Stack>
  );
};

export default FinishedRound;
