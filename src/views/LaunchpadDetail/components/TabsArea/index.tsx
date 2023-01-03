import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Tabs, Tab, Container, styled } from '@mui/material';
import PropTypes from 'prop-types';
import TokenSale from './TokenSale';
import VestingSchedule from './VestingSchedule';
import AboutGame from './AboutGame';
import { MENU_HEIGHT } from 'configs/menu/config';

interface TabsAreaProps {
  data: any;
  isMobile: boolean;
  unit?: string;
  token: any;
}

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const TabsArea: React.FC<TabsAreaProps> = ({ data, isMobile = false, unit, token: tokenContract }) => {
  const [value, setValue] = React.useState(0);
  const tabHead = useRef<HTMLInputElement>(null);
  const [topPosition, setTopPosition] = useState(0);

  const pop = useCallback(() => {
    const temp = tabHead?.current?.getBoundingClientRect().top;
    setTopPosition(temp ? temp : 0);
    // if (tabHead.current) {
    //   topPosition <= 0
    //     ? (tabHead.current.style.background = 'inherit')
    //     : (tabHead.current.style.background = 'transparent');
    // }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', pop);
  }, [pop]);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <WrapTab
      sx={{
        width: '100%',
      }}
    >
      <TabHead ref={tabHead} sx={{
        paddingTop: `${MENU_HEIGHT}px`,
        background: topPosition < 10 ? theme => theme.palette.background.default : theme => (theme.palette as any).extra.background.alt
      }}>
        <Container>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '.MuiTabs-flexContainer':{
                gap: '20px'
              }
            }}
          >
            <TabCustom label="Information" {...a11yProps(0)} />
            <TabCustom label="Token Sale" {...a11yProps(1)} />
            <TabCustom label="Vesting Schedule" {...a11yProps(2)} />
          </Tabs>
        </Container>
      </TabHead>
      <TabPanelCustom value={value} index={0}>
        <Container>
          <AboutGame html={data?.description} />
        </Container>
      </TabPanelCustom>
      <TabPanelCustom value={value} index={1}>
        <Container>
          <TokenSale data={data} isMobile={isMobile} unit={unit} tokenContract={tokenContract} />
        </Container>
      </TabPanelCustom>
      <TabPanelCustom value={value} index={2}>
        <Container>
          <VestingSchedule data={data} />
        </Container>
      </TabPanelCustom>
    </WrapTab>
  );
};

const WrapTab = styled(Box)``;
const TabCustom = styled(Tab)`
  font-weight: 500;
  font-size: 14px;
  color: ${(props) => props.theme.palette.text.secondary};
  font-family: inherit;
  text-transform: inherit;
  padding: 0;

  &.Mui-selected {
    color: ${(props) => props.theme.palette.text.primary};
  }

  ${(props) => props.theme.breakpoints.down('md')} {
    font-size: 15px;
  }
`;
const TabHead = styled(Box)`
  position: sticky;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid ${(props) => (props.theme.palette as any).extra.card.divider};

  .MuiTabs-indicator {
    background-color: ${(props) => props.theme.palette.primary.main};
    border-radius: 0;
    height: 2px;
  }
`;
const TabPanelCustom = styled(TabPanel)`
  padding-top: 40px;
  padding-bottom: ${(props) => (props.theme.breakpoints.down('md') ? '40px' : '160px')};
  min-height: 475px;
`;

export default TabsArea;
