import React, { useState } from 'react';
import { Box, Typography, styled, Stepper, Step } from '@mui/material';
import { steps } from './config';
import { Container } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'state';
import { setStepLaunchpad } from 'state/presale/action';
import Step01 from './components/Step01';
import Step02 from './components/Step02';
import Step03 from './components/Step03';
import Step04 from './components/Step04';
import Step05 from './components/Step05';
import Step06 from './components/Step06';
import NotSupportSection from 'components/NotSupportSection';
import { ChainId } from '@bionswap/core-sdk';
import { useChain, useCurrencyBalance, useToken } from 'hooks';
import ConnectWalletSection from './components/ConnectWalletSection';

const CreateLaunchpad = () => {
  const { chainId, account } = useChain();

  const data = useAppSelector((state) => state.presale.dataConfig);
  const activeStep = useAppSelector((state) => state.presale.step);
  const dispatch = useAppDispatch();

  const handleNext = async () => {
    dispatch(setStepLaunchpad(activeStep + 1));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const handleBack = () => {
    dispatch(setStepLaunchpad(activeStep - 1));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Section>
      {ChainId.BSC_TESTNET !== chainId ? (
        <NotSupportSection />
      ) : !account ? (
        <ConnectWalletSection />
      ) : (
        <>
          <Container maxWidth="lg">
            <Box sx={{ width: '100%' }} pt="150px">
              <WrapStep sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Stepper activeStep={activeStep}>
                  {steps.map((item, index) => {
                    return (
                      <StepCustom key={item.title} className={activeStep === index ? 'activeStep' : ''}>
                        <FlexBox flexDirection="column" gap="13px" alignItems="center">
                          <Typography
                            variant="body4Poppins"
                            textTransform="uppercase"
                            fontWeight={activeStep === index ? '500' : '400'}
                            color={activeStep === index ? 'primary.main' : 'gray.600'}
                            fontStyle="initial"
                          >
                            {item.step}. {item.title}
                          </Typography>
                          <WapIcon className={activeStep === index ? 'done' : ''}>
                            <img src={item.icon} alt={item.icon} />
                          </WapIcon>
                        </FlexBox>
                      </StepCustom>
                    );
                  })}
                </Stepper>
              </WrapStep>
              {activeStep === 0 && (
                <Step01
                  data={data}
                  setData={dispatch}
                  onNextStep={handleNext}
                  onBackStep={handleBack}
                />
              )}
              {activeStep === 1 && (
                <Step02 data={data} setData={dispatch} onNextStep={handleNext} onBackStep={handleBack} />
              )}
              {activeStep === 2 && (
                <Step03 data={data} setData={dispatch} onNextStep={handleNext} onBackStep={handleBack} />
              )}
              {activeStep === 3 && (
                <Step04 data={data} setData={dispatch} onNextStep={handleNext} onBackStep={handleBack} />
              )}
              {activeStep === 4 && (
                <Step05 data={data} setData={dispatch} onNextStep={handleNext} onBackStep={handleBack} />
              )}
              {activeStep === 5 && (
                <Step06 data={data} setData={dispatch} onNextStep={handleNext} onBackStep={handleBack} />
              )}
            </Box>
          </Container>
        </>
      )}
    </Section>
  );
};

const FlexBox = styled(Box)`
  display: flex;
`;
const Section = styled(Box)`
  background-color: ${(props) => props.theme.palette.background.default};
  min-height: 100vh;
`;
const WapIcon = styled(Box)`
  width: 34px;
  height: 34px;
  backdrop-filter: blur(1.25px);
  border: 1px solid;
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: ${(props) => props.theme.palette.primary.main};
  background-color: ${(props) => (props.theme.palette as any).extra.card.background};
  border-radius: 50%;
  opacity: 0.25;

  &.done {
    opacity: 1;
  }
`;
const WrapStep = styled(Box)`
  padding-bottom: 17px;

  .MuiStepConnector-root {
    visibility: hidden;
  }
`;
const StepCustom = styled(Step)`
  position: relative;

  &.activeStep {
    ::after {
      content: '';
      position: absolute;
      width: 100%;
      background-color: ${(props) => props.theme.palette.primary.main};
      border-radius: 4px 4px 0px 0px;
      height: 4px;
      left: 0;
      bottom: -17px;
    }
  }

  &.Mui-completed {
    span {
      color: ${(props) => props.theme.palette.gray[400]};
    }

    .MuiBox-root {
      opacity: 1;
    }
  }
`;

export default CreateLaunchpad;
