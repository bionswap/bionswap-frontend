import { styled, Box, Container, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import LeaderboardTable from './components/LeaderboardTable';

const configs = [
  {
    player: 'User1234',
    netWinning: '+ 30.000$',
    winRate: '52.49%',
    roundWon: '11,362',
    roundsPlayed: '21,727',
  },
  {
    player: 'User1234',
    netWinning: '+ 30.000$',
    winRate: '52.49%',
    roundWon: '11,362',
    roundsPlayed: '21,727',
  },
  {
    player: 'User1234',
    netWinning: '+ 30.000$',
    winRate: '52.49%',
    roundWon: '11,362',
    roundsPlayed: '21,727',
  },
  {
    player: 'User1234',
    netWinning: '+ 30.000$',
    winRate: '52.49%',
    roundWon: '11,362',
    roundsPlayed: '21,727',
  },
  {
    player: 'User1234',
    netWinning: '+ 30.000$',
    winRate: '52.49%',
    roundWon: '11,362',
    roundsPlayed: '21,727',
  },
];

const LeaderboardSection = () => {
  return (
    <Section>
      <Container maxWidth="xl">
        <Stack width="100%" gap="24px" alignItems="flex-start">
          <Stack flexDirection="row" gap="15px">
            <Box
              position="relative"
              sx={{
                width: '32px',
                aspectRatio: '1/1.156',
              }}
            >
              <Image
                src="/images/LeaderboardThisWeek.svg"
                alt="LeaderboardThisWeek"
                layout="fill"
                objectFit="contain"
              />
            </Box>
            <Typography variant="h5Samsung" lineHeight="40px" color="text.primary">
              Leaderboard this week
            </Typography>
          </Stack>
          <Box width='100%'>
            <LeaderboardTable data={configs} />
          </Box>
        </Stack>
      </Container>
    </Section>
  );
};

const Section = styled(Box)`
  padding-top: 60px;
`;

export default LeaderboardSection;
