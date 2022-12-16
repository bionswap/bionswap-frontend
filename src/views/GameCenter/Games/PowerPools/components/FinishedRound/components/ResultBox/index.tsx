import { Typography, styled, Box, Stack, FormControl, OutlinedInput, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import Image from 'next/image';
import { shortenAddress } from 'utils/format';
import { useSingleCallResult } from 'hooks';

const rewards = ['1st', '2nd', '2nd'];

const ResultBox = ({ parentContract }: any) => {
  const [isInit, setIsInit] = useState(true);
  const getPrizeDistributions = useSingleCallResult(parentContract, 'getPrizeDistributions')?.result?.[0] || [];
  const currentRoundId = Number(useSingleCallResult(parentContract, 'currentRoundId')?.result?.[0] || 0);
  const [roundId, setRoundId] = useState(0);
  const getWinnersAtRound = useSingleCallResult(parentContract, 'getWinnersAtRound', [roundId])?.result?.[0] || [];

  const handleChange = (event: any) => {
    console.log('event==>', typeof event);
    if (typeof event === 'object') {
      setRoundId(event?.target?.value ? event.target.value : '0');
    } else if (typeof event === 'number') {
      setRoundId(event);
    }
    if (isInit) {
      setIsInit(false);
    }
  };

  const nextRound = () => {
    handleChange(roundId + 1);
  };

  const lastRound = () => {
    handleChange(currentRoundId - 1);
  };

  const prevRound = () => {
    handleChange(roundId - 1);
  };

  const firstRound = () => {
    handleChange(0);
  };

  useEffect(() => {
    if (isInit) {
      setRoundId(currentRoundId == 0 ? currentRoundId : currentRoundId - 1);
    }
  }, [currentRoundId, isInit]);

  return (
    <WrapBox>
      <WrapHeader>
        <Stack width="100%" flexDirection="row" alignItems="center" justifyContent="space-between">
          <Stack gap="15px" alignItems="baseline">
            <Stack flexDirection="row" gap="15px">
              <Typography variant="h6Poppins" fontWeight="500" color="text.primary">
                Round
              </Typography>
              <FormControl variant="outlined">
                <OutlinedInputCustom value={roundId} onChange={handleChange} />
              </FormControl>
            </Stack>
            <Typography variant="body4Poppins" fontWeight="400" color="text.secondary">
              Drawn Oct 21, 2022, 7:01 PM
            </Typography>
          </Stack>
          <Stack flexDirection="row" gap="25px">
            <ActionButton disabled={roundId <= 0} onClick={firstRound}>
              <KeyboardDoubleArrowLeftOutlinedIcon color="inherit" fontSize="inherit" />
            </ActionButton>
            <ActionButton disabled={roundId <= 0} onClick={prevRound}>
              <KeyboardArrowLeftOutlinedIcon color="inherit" fontSize="inherit" />
            </ActionButton>
            <ActionButton disabled={roundId >= currentRoundId - 1} onClick={nextRound}>
              <KeyboardArrowRightOutlinedIcon color="inherit" fontSize="inherit" />
            </ActionButton>
            <ActionButton disabled={roundId >= currentRoundId - 1} onClick={lastRound}>
              <KeyboardDoubleArrowRightOutlinedIcon color="inherit" fontSize="inherit" />
            </ActionButton>
          </Stack>
        </Stack>
      </WrapHeader>
      <WrapBody>
        <Stack width="100%" flexDirection="row" justifyContent="space-between" mb="40px">
          <Typography variant="bodyPoppins" fontWeight="500" color="text.primary">
            🏆 Winners
          </Typography>
          {roundId === currentRoundId - 1 && (
            <Latest>
              <Typography variant="body3Poppins" fontWeight="500" color="white">
                Latest
              </Typography>
            </Latest>
          )}
        </Stack>
        <Stack spacing={3} width="100%">
          {rewards?.map((item: any, index: number) => (
            <>
              <Stack
                key={item}
                direction="row"
                spacing={2}
                width="100%"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction='row' spacing={3}>
                  <Typography variant="body4Poppins" fontWeight="400" color="text.primary">
                    {item}
                  </Typography>
                  <Stack direction='row' spacing={1}>
                    <Image src="/images/AvatarReward.png" alt="AvatarReward" width="38px" height="38px" />
                    <Stack alignItems="flex-start">
                      <Typography color='text.primary'>{shortenAddress(getWinnersAtRound[index])}</Typography>
                      <Typography color='text.secondary' fontSize='14px'>@Anomyous User</Typography>
                    </Stack>
                  </Stack>
                </Stack>
                <Stack alignItems="flex-start">
                  <Typography variant="body4Poppins" fontWeight="400" color="primary.main">
                    +{Number(getPrizeDistributions[index] || 0)}{' '}
                    {Number(getPrizeDistributions[index] || 0) > 1 ? 'TICKETS' : 'TICKET'}
                  </Typography>
                  <Typography variant="body4Poppins" fontWeight="400" color="text.secondary">
                    ~{Number(getPrizeDistributions[index] || 0) * 3}$
                  </Typography>
                </Stack>
              </Stack>
            </>
          ))}
        </Stack>
      </WrapBody>
      <WrapFooter>
        <Typography variant="body4Poppins" fontWeight="400" color="primary.main">
          View on BscScan
        </Typography>
      </WrapFooter>
    </WrapBox>
  );
};

const WrapBox = styled(Box)`
  border-radius: 8px;
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
  overflow: hidden;
`;
const WrapHeader = styled(Box)`
  padding: 25px 25px 20px;
  border-bottom: 1px solid;
  border-color: ${(props) => (props.theme.palette as any).extra.card.divider};
`;
const WrapBody = styled(Box)`
  padding: 25px;
`;
const WrapFooter = styled(Box)`
  border-top: 1px solid;
  border-color: ${(props) => (props.theme.palette as any).extra.card.divider};
  padding: 25px;
  text-align: center;
`;
const Latest = styled(Box)`
  padding: 10px 15px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.palette.success.main};
`;
const OutlinedInputCustom = styled(OutlinedInput)`
  input {
    padding: 5px 20px;
    background: ${(props) => (props.theme.palette as any).extra.background.alt};
    font-weight: 400;
    font-size: 18px;
    line-height: 180%;
    color: ${props => props.theme.palette.primary.main};
    max-width: 55px;
    border-radius: 8px;
    text-align: center;
  }

  fieldset {
    display: none;
  }
`;
const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background-color: ${(props) => (props.theme.palette as any).extra.card.divider};
`;
const ActionButton = styled(Button)`
  color: ${(props) => props.theme.palette.text.secondary};
  font-size: 20px;
  padding: 0;
  width: auto;
  min-width: auto;
`;

export default ResultBox;
