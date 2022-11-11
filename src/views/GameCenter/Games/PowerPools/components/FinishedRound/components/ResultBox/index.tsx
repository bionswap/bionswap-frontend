import { Typography, styled, Box, Stack, FormControl, OutlinedInput, Button } from '@mui/material';
import { useState } from 'react';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import Image from 'next/image';
import { shortenAddress } from 'utils/format';
import { useSingleCallResult } from 'hooks';

const rewards = ['1st', '2nd', '2nd'];

const ResultBox = ({ parentContract }: any) => {
  const [roundId, setRoundId] = useState(0);

  const getWinnersAtRound = useSingleCallResult(parentContract, 'getWinnersAtRound', [roundId])?.result?.[0] || [];
  const getPrizeDistributions = useSingleCallResult(parentContract, 'getPrizeDistributions')?.result?.[0] || [];

  const handleChange = (event: any) => {
    setRoundId(event.target.value);
  };

  return (
    <WrapBox>
      <WrapHeader>
        <Stack width="100%" flexDirection="row" alignItems="center" justifyContent="space-between">
          <Stack gap="15px" alignItems="baseline">
            <Stack flexDirection="row" gap="15px">
              <Typography variant="h6Poppins" fontWeight="500" color="background.paper">
                Round
              </Typography>
              <FormControl variant="outlined">
                <OutlinedInputCustom value={roundId} onChange={handleChange} />
              </FormControl>
            </Stack>
            <Typography variant="body4Poppins" fontWeight="400" color="gray.400">
              Drawn Oct 21, 2022, 7:01 PM
            </Typography>
          </Stack>
          <Stack flexDirection="row" gap="25px">
            <Button>
              <KeyboardDoubleArrowLeftOutlinedIcon color="inherit" fontSize="inherit" />
            </Button>
            <Button>
              <KeyboardArrowLeftOutlinedIcon color="inherit" fontSize="inherit" />
            </Button>
            <Button>
              <KeyboardArrowRightOutlinedIcon color="inherit" fontSize="inherit" />
            </Button>
            <Button>
              <KeyboardDoubleArrowRightOutlinedIcon color="inherit" fontSize="inherit" />
            </Button>
          </Stack>
        </Stack>
      </WrapHeader>
      <WrapBody>
        <Stack width="100%" flexDirection="row" justifyContent="space-between">
          <Typography variant="bodyPoppins" fontWeight="500" color="background.paper">
            🏆 Winners
          </Typography>
          <Latest>
            <Typography variant="body3Poppins" fontWeight="500" color="background.paper">
              Latest
            </Typography>
          </Latest>
        </Stack>
        <Stack gap="15px" width="100%">
          {rewards?.map((item: any, index: number) => (
            <>
              <Stack
                key={item}
                flexDirection="row"
                gap="12px"
                width="100%"
                justifyContent="flex-start"
                alignItems="center"
              >
                <Typography variant="body4Poppins" fontWeight="400" color="gray.300">
                  {item}
                </Typography>
                <Image src="/images/AvatarReward.png" alt="AvatarReward" width="38px" height="38px" />
                <Stack alignItems="flex-start">
                  <Typography>{shortenAddress(getWinnersAtRound[index])}</Typography>
                  <Typography>@Anomyous User</Typography>
                </Stack>
                <Stack marginLeft="auto" alignItems="flex-start">
                  <Typography variant="body4Poppins" fontWeight="400" color="success.main">
                    +{Number(getPrizeDistributions[index] || 0)}{' '}
                    {Number(getPrizeDistributions[index] || 0) > 1 ? 'TICKETS' : 'TICKET'}
                  </Typography>
                  <Typography variant="body4Poppins" fontWeight="400" color="gray.400">
                    ~{Number(getPrizeDistributions[index] || 0) * 3}$
                  </Typography>
                </Stack>
              </Stack>
              { index < rewards.length - 1 && <Line /> }
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
  border: 1px solid;
  border-color: ${(props) => props.theme.palette.gray[700]};
  border-radius: 8px;
  background-color: #0c1620;
  overflow: hidden;
`;
const WrapHeader = styled(Box)`
  padding: 25px 25px 20px;
  border-bottom: 1px solid;
  border-color: ${(props) => props.theme.palette.gray[700]};
`;
const WrapBody = styled(Box)`
  padding: 25px;
`;
const WrapFooter = styled(Box)`
  border-top: 1px solid;
  border-color: ${(props) => props.theme.palette.gray[700]};
  padding: 25px;
  text-align: center;
`;
const Latest = styled(Box)`
  padding: 10px 15px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.palette.secondary.main};
`;
const OutlinedInputCustom = styled(OutlinedInput)`
  input {
    padding: 5px 20px;
    background: #000000;
    font-weight: 400;
    font-size: 18px;
    line-height: 180%;
    color: #2ac89f;
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
  background-color: ${(props) => props.theme.palette.gray[600]};
`;

export default ResultBox;
