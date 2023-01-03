import { Typography, styled, Box, Stack, IconButton } from '@mui/material';
import BaseModal from 'components/BaseModal';
import PrimaryLoadingButton from 'components/PrimaryLoadingButton';
import { useSingleCallResult } from 'hooks';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { shortenAddress } from 'utils/format';
import CloseIcon from '@mui/icons-material/Close';

const rewards = ['1st', '2nd', '2nd'];

const YourRewardModal = ({
  open,
  onDismiss,
  account,
  totalSlots,
  getPrizeDistributions,
  parentContract,
  currentRoundId,
  shareOf,
}: any) => {
  const [isWinner, setIsWinner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prize, setPrize] = useState(0);
  const getWinnersAtRound =
    useSingleCallResult(parentContract, 'getWinnersAtRound', [currentRoundId])?.result?.[0] || [];
  const isUserClaimedPrizes = useSingleCallResult(parentContract, 'isUserClaimedPrizes', [currentRoundId, account])
    ?.result?.[0];

  useEffect(() => {
    getWinnersAtRound?.map((item: any) => {
      if (account == item) {
        setIsWinner(true);
      }
    });
  }, [getWinnersAtRound]);

  useEffect(() => {
    let poolsP = 0;
    getPrizeDistributions?.map((item: any, index: number) => {
      if (account === getWinnersAtRound[index]) {
        poolsP += Number(item || 0);
      }
    });
    setPrize(poolsP);
  }, [getPrizeDistributions, open]);

  const claimReward = async () => {
    try {
      if (!parentContract || !account || !prize) return;
      setIsLoading(true);
      const tx = await parentContract.claim(currentRoundId);
      await tx.wait();
      setIsLoading(false);
    } catch (error) {
      console.log('error===>', error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <BaseModal
        open={open}
        sx={{
          padding: '0',
          maxWidth: '600px',
          width: '100%',
          height: 'auto',
          maxHeight: '749px',
          overflowY: 'auto',
        }}
      >
        <IconButton onClick={onDismiss} sx={{ position: 'absolute', right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
        <WrapHeader>
          <Typography variant="h6Poppins" fontWeight="500" color="background.paper">
            Round {currentRoundId}#
          </Typography>
        </WrapHeader>
        <WrapBody>
          <Typography variant="h6Poppins" fontWeight="500" color="background.paper">
            Winners
          </Typography>
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
                <Line />
              </>
            ))}
          </Stack>
          <Typography variant="h6Poppins" fontWeight="500" color="success.main">
            Your status
          </Typography>
          <WrapBox>
            {!isWinner ? (
              <Typography variant="body3Poppins" fontWeight="500" color="gray.400">
                No prizes to claim...
                <br />
                Better luck next time!
              </Typography>
            ) : (
              <Stack width="100%" flexDirection="row" justifyContent="space-between">
                <Stack gap="11px" alignItems="flex-start">
                  <Typography variant="h5Samsung" color="primary.main">
                    🎁 Winner chicken dinner!
                  </Typography>
                  <Typography variant="body3Poppins" color="gray.300" fontWeight="500">
                    Congratulations, you have won
                  </Typography>
                </Stack>
                <Image src="/images/1ticket.png" alt="1ticket.png" width="123px" height="123px" />
              </Stack>
            )}
          </WrapBox>
          {isWinner && (
            <PrimaryLoadingButton
              disabled={isUserClaimedPrizes}
              onClick={claimReward}
              isLoading={isLoading}
              sx={{ height: '55px' }}
            >
              <Typography variant="body3Poppins" fontWeight="600" color="#000000">
                {!isUserClaimedPrizes ? 'Claim reward' : 'Claimed'}
              </Typography>
            </PrimaryLoadingButton>
          )}
        </WrapBody>
        <WrapFooter>
          <Typography variant="body4Poppins" fontWeight="400" color="primary.main">
            View on BscScan
          </Typography>
        </WrapFooter>
      </BaseModal>
    </>
  );
};

const WrapHeader = styled(Box)`
  padding: 28px 25px 20px;
  border-bottom: 1px solid;
  border-color: ${(props) => props.theme.palette.gray[600]};
`;
const WrapBody = styled(Stack)`
  padding: 25px;
  width: 100%;
  align-items: flex-start;
  gap: 20px;
`;
const WrapFooter = styled(Box)`
  padding: 28px 25px 20px;
  border-top: 1px solid;
  border-color: ${(props) => props.theme.palette.gray[600]};
  text-align: center;
`;
const Line = styled(Box)`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.palette.gray[600]};
`;
const WrapBox = styled(Box)`
  width: 100%;
  height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 15px;
  border: 1px solid;
  border-color: ${(props) => props.theme.palette.gray[700]};
`;

export default YourRewardModal;
