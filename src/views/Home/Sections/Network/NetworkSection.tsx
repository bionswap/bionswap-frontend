/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Box, Button, Container, styled, Typography } from '@mui/material';
import { MobileProp } from 'configs/Type/Mobile/type';
import Image from 'next/image';
import { useRouter } from 'next/router';


const NetworkSection = ({ isMobile, isTablet }: MobileProp) => {
  const router = useRouter();

  return (
    <Wrapper>
      <Container maxWidth="lg">
        <FlexBox flexDirection={isTablet ? 'column' : 'row'} justifyContent="space-between">
          <FlexBox flexDirection="column" gap="24px">
            <FlexBox gap="20px">
              <Image src="/icons/home/network_symbol.svg" alt="network_symbol" width={37} height={25} />
              <Typography variant="subtitle1" sx={{ color: '#575757' }}>
                network
              </Typography>
            </FlexBox>
            <WrapNetworkHead>
              <Typography variant="h2" sx={{ color: 'text.secondary', fontSize: isMobile ? '48px' : null }}>
                All projects launched <Box sx={{ color: 'secondary.main' }}>Multi-powers!</Box>
              </Typography>
            </WrapNetworkHead>
            <ExploreButton
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                router.push('/launchpad');
              }}
            >
              Explore now !
            </ExploreButton>
          </FlexBox>
          <FlexBox alignItems="end" width="40%" sx={{ display: { xs: 'none', md: 'block' } }}>
            <WrapImage>
              <img src="/images/home/computer.png" alt="" width="100%" height="auto" />
            </WrapImage>
          </FlexBox>
        </FlexBox>
      </Container>
    </Wrapper>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const WrapImage = styled(Box)`
  position: absolute;
  bottom: -7px;
  max-width: 30%;
  width: 100%;
`;
const Wrapper = styled(Box)`
  width: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 8rem 0;
  justify-content: center;
  position: relative;
  z-index: 10;

  ${(props) => props.theme.breakpoints.down('sm')} {
    padding-bottom: 8vh;
  }
`;
const Line = styled(Box)`
  width: 1px;
  height: 89px;
  background-color: #595959;
`;
const ConfigItem = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: center;
`;
const WrapConfig = styled(Box)`
  background-color: ${(props) => props.theme.palette.background.paper};
  border: 1px solid #000000;
  padding: 37px 72px;
  display: flex;
  gap: 71px;
  margin-top: -12rem;
  justify-content: space-between;

  ${(props) => props.theme.breakpoints.down('sm')} {
    flex-direction: column;
    padding: 30px;
    gap: 30px;
  }
`;
const WrapNetworkHead = styled(Box)`
  max-width: 445px;
  width: 100%;
`;
const ExploreButton = styled(Button)`
  width: fit-content;
  padding: 12px 70px;
  background: ${(prop) => prop.theme.palette.background.default};
  color: ${(prop) => prop.theme.palette.text.primary};
`;

export default NetworkSection;
