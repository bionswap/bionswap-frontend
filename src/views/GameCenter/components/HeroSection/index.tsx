import { Box, Container, styled, Stack, Typography, OutlinedInput } from '@mui/material';
import Image from 'next/image';
import PrimaryLoadingButton from 'components/PrimaryLoadingButton';
import { useState } from 'react';
import useMediaQuery from 'hooks/useMediaQuery';

const HeroSection = () => {
  const { isMobile, isTablet } = useMediaQuery();
  const [email, setEmail] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <Section>
      <Container maxWidth="xl">
        <Stack flexDirection={isMobile ? "column" : "row"} gap="24px" pt="60px" pb='60px'>
          <EventBox>
            <Stack gap="15px" alignItems="flex-start">
              <Box width="107px" height="29px" position="relative">
                <Image
                  src="/images/gamecenter/heroSection/BionSwap.svg"
                  alt="BionSwap"
                  layout="fill"
                  objectFit="contain"
                />
              </Box>
              <Typography variant="h7Samsung" color="text.primary">
                Event ticket airdrop
              </Typography>
              <JoinnNow>
                <Typography variant="body4Poppins" fontWeight="500" lineHeight="27px" color="primary.main">
                  Join now
                </Typography>
              </JoinnNow>
            </Stack>
          </EventBox>
          <StackBox>
            <Stack gap="20px" alignItems="flex-start">
              <Typography variant="h7Samsung" color="text.primary">
                Stake with us!
              </Typography>
              <Typography variant="body3Poppins" color="gray.400" fontWeight="400">
                Staking will be available on our platform soon. Keep an eye out!
              </Typography>
              <OutlinedInputCustom
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                endAdornment={
                  <SendButton>
                    <Typography variant="body4Poppins" color="#000000" fontWeight="500">
                      Send
                    </Typography>
                  </SendButton>
                }
                aria-describedby="outlined-weight-helper-text"
              />
            </Stack>
          </StackBox>
        </Stack>
      </Container>
    </Section>
  );
};

const Section = styled(Box)`
  min-height: 500px;
  height: auto;
  width: 100%;
  background-image: url('/images/gamecenter/heroSection/BgHeroSection.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
const EventBox = styled(Box)`
  padding: 24px;
  background-image: url('/images/gamecenter/heroSection/Frame427321971.png');
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 215px;
  border-radius: 12px;
  display: flex;
  width: 100%;
`;
const StackBox = styled(Box)`
  padding: 24px;
  min-height: 215px;
  max-width: 410px;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
  border-image-source: linear-gradient(
    154.49deg,
    #24c1c7 4.27%,
    rgba(77, 201, 196, 0.7835) 9.64%,
    rgba(132, 212, 193, 0) 56.9%,
    rgba(153, 226, 188, 0.6365) 89.59%,
    #b7f5b6 109.25%
  );
  border: 1px solid transparent;
  border-radius: 12px;

  @media (max-width: 599px) {
    max-width: 100%;
  }
`;
const SendButton = styled(PrimaryLoadingButton)`
  height: 45px;
  border-radius: 0px 8px 8px 0px;
  width: 68px;
`;
const OutlinedInputCustom = styled(OutlinedInput)`
  padding: 0;
  width: 100%;
  border-radius: 8px;
  background-color: #000e12;
  border: none;
  height: 45px;

  input {
    padding-top: 0;
    padding-bottom: 0;
  }

  fieldset {
    display: none;
  }
`;
const JoinnNow = styled(PrimaryLoadingButton)`
  width: 110px;
  height: 40px;
  background: rgba(7, 224, 224, 0.15);
`;

export default HeroSection;
