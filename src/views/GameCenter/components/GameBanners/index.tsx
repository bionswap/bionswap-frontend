import { Box, Container, styled, Stack, Typography } from '@mui/material';
import PrimaryLoadingButton from 'components/PrimaryLoadingButton';
import useMediaQuery from 'hooks/useMediaQuery';
import { Swiper, SwiperSlide } from 'swiper/react';

const configs = [
  {
    id: 'spinDrop',
    nameGame: {
      title: 'SPIN DROP',
      style: {},
    },
    description: {
      title: 'Welcome to spin and win game. Play and enjoy',
      style: {
        color: 'gray.400',
      },
    },
    button: {
      title: 'Join Game',
      style: {
        width: '140px',
        height: '52px',
        bgColor: 'rgba(7, 224, 224, 0.2)',
        color: 'primary.main',
      },
    },
    background: {
      image: '/images/gamecenter/banners/SpinDrop.png',
    },
  },
  {
    id: 'powerPool',
    nameGame: {
      title: 'POWER POOL',
      style: {},
    },
    description: {
      title: 'Welcome to spin and win game. Play and enjoy',
      style: {
        color: 'gray.50',
      },
    },
    button: {
      title: 'Join Game',
      style: {
        width: '140px',
        height: '52px',
        bgColor: 'warning.main',
        color: 'text.primary',
      },
    },
    background: {
      image: '/images/gamecenter/banners/PowerPool.png',
    },
  },
];

const GameBanners = () => {
  const { isMobile, isTablet } = useMediaQuery();

  return (
    <WrapBox>
      <Container maxWidth="xl">
        <Swiper spaceBetween={22} slidesPerView={isTablet ? 1 : 2}>
          {configs?.map((item: any) => (
            <SwiperSlide key={item?.id}>
              <WrapBanner
                sx={{
                  backgroundImage: `url(${item?.background?.image})`,
                  justifyContent: item?.id === 'powerPool' ? 'flex-end' : 'flex-start',
                }}
              >
                <ContentBanner>
                  <Typography variant="h4Samsung" color="text.primary" fontWeight="700">
                    {item?.nameGame?.title}
                  </Typography>
                  <Typography variant="body3Poppins" color={item?.description?.style?.color} fontWeight="400">
                    {item?.description?.title}
                  </Typography>
                  <JoinGame
                    sx={{
                      width: item?.button?.style?.width,
                      height: item?.button?.style?.height,
                      backgroundColor: item?.button?.style?.bgColor,
                      '&:hover': {
                        backgroundColor: item?.button?.style?.bgColor,
                        opacity: 0.9,
                      },
                    }}
                  >
                    <Typography variant="body3Poppins" color={item?.button?.style?.color} fontWeight="500">
                      Join Game
                    </Typography>
                  </JoinGame>
                </ContentBanner>
              </WrapBanner>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </WrapBox>
  );
};

const WrapBox = styled(Box)`
  margin-top: -145px;

  @media (max-width: 599px) {
    margin-top: 0;
  }
`;
const WrapBanner = styled(Box)`
  width: 100%;
  aspect-ratio: 1/0.469;
  background-size: 100%;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  padding: 30px;
`;
const ContentBanner = styled(Stack)`
  gap: 4px;
  max-width: 260px;
  align-items: flex-start;

  @media (max-width: 1199px) {
    max-width: 200px;
  }
`;
const JoinGame = styled(PrimaryLoadingButton)`
  margin-top: 20px;

  @media (max-width: 1199px) {
    margin-top: 10px;
  }
`;

export default GameBanners;
