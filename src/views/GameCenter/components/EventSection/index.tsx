import { styled, Box, Container, Stack, Typography, LinearProgress } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

const configs = [
  {
    title: 'Weekly Bonus',
    description: 'Come to us more often and get bonuses!',
    image: '/images/gamecenter/eventSection/WeeklyBonus.svg',
  },
  {
    title: 'Giveaways',
    description: 'The higher rank you are, more suprise.',
    image: '/images/gamecenter/eventSection/Giveaways.svg',
  },
];

const EventSection = () => {
  const [progress, setProgress] = useState(20);

  return (
    <Section>
      <Container maxWidth="xl">
        <Stack flexDirection="row" gap="24px" flexWrap="wrap">
          <Rank>
            <Stack flexDirection="row" gap="20px" width="100%">
              <RankIcon>
                <Box position="relative" width="52px" height="52px" top="-2px">
                  <Image src="/images/ranks/Axeton.svg" alt="" layout="fill" objectFit="contain" />
                </Box>
              </RankIcon>
              <Stack gap="20px" width="100%" alignItems='flex-start'>
                <Typography variant="h6Poppins" color="text.primary" fontWeight="700">
                  BionSwap
                </Typography>
                <Box color="success.main" width='100%' height='8px'>
                  <LinearProgress color="inherit" variant="determinate" value={progress} sx={{
                    height: '8px',
                    borderRadius: '8px'
                  }} />
                </Box>
                <Stack flexDirection="row" width="100%" justifyContent="space-between">
                  <Typography variant="body4Poppins" color="gray.400" fontWeight="400">
                    Current:
                    <Typography variant="body4Poppins" color="#EF5DA8" fontWeight="600">
                      {' '}
                      Axeton
                    </Typography>
                  </Typography>
                  <Typography variant="body4Poppins" color="gray.400" fontWeight="400">
                    Next:
                    <Typography variant="body4Poppins" color="gray.300" fontWeight="600">
                      {' '}
                      Viserium
                    </Typography>
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Rank>
          {configs?.map((item: any) => (
            <WrapBox key={item.title}>
              <Stack width="100%" flexDirection="row" gap="20px">
                <Box position="relative" minWidth="80px" height="80px">
                  <Image src={item.image} alt={item.image} layout="fill" objectFit="contain" />
                </Box>
                <Stack gap="6px" alignItems="flex-start">
                  <Typography variant="h6Poppins" fontWeight="600" color="text.primary">
                    {item.title}
                  </Typography>
                  <Typography variant="body4Poppins" fontWeight="400" color="gray.400">
                    {item.description}
                  </Typography>
                </Stack>
              </Stack>
            </WrapBox>
          ))}
        </Stack>
      </Container>
    </Section>
  );
};

const Section = styled(Box)``;
const WrapBox = styled(Box)`
  height: 150px;
  border: 1px solid;
  border-color: ${(props) => props.theme.palette.gray[700]};
  border-radius: 12px;
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
  padding: 14px 24px 24px 14px;
  max-width: 315px;
  display: flex;
`;
const Rank = styled(Box)`
  height: 150px;
  flex: 1;
  border: 1px solid;
  border-color: ${(props) => props.theme.palette.gray[700]};
  border-radius: 12px;
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
  padding: 24px;
  display: flex;
`;
const RankIcon = styled(Box)`
  background: #000000;
  border: 6px solid #373f47;
  border-radius: 9999px;
  min-width: 75px;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default EventSection;
