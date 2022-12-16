import { Box, Container, Stack, styled, Typography } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import BoxItem from './components/BoxItem';

const configs = [
  {
    logo: '/images/SpinDropGame.svg',
    name: 'Spin Drop',
    online: '556',
    hourlyDrop: '556.23',
    dailyDrop: '5678.34',
    link: '',
  },
  {
    logo: '/images/PowerPoolGame.svg',
    name: 'Power Pool',
    online: '556',
    hourlyDrop: '556.23',
    dailyDrop: '5678.34',
    link: '',
  },
  {
    logo: '/images/WinkyWheelGame.svg',
    name: 'Winky Wheel',
    online: '556',
    hourlyDrop: '556.23',
    dailyDrop: '5678.34',
    link: '',
  },
];

const GamesSection = () => {
  return (
    <Section>
      <Container maxWidth="xl">
        <Stack width="100%" gap="24px" alignItems='flex-start'>
          <Stack flexDirection="row" gap="15px">
            <Box
              position="relative"
              sx={{
                width: '32px',
                aspectRatio: '1/1.156',
              }}
            >
              <Image src="/images/allgames.svg" alt="allgames" layout="fill" objectFit="contain" />
            </Box>
            <Typography variant="h5Samsung" lineHeight="40px" color="text.primary">
              All games
            </Typography>
          </Stack>
          <Box width="100%">
            <Swiper spaceBetween={24} slidesPerView={3}>
              {configs?.map((item: any) => (
                <SwiperSlide key={item?.logo}>
                  <BoxItem data={item} />
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Stack>
      </Container>
    </Section>
  );
};

const Section = styled(Box)`
  margin-top: 60px;
`;

export default GamesSection;
