import {
    Box,
    Container,
    styled,
    Typography
} from '@mui/material'
import Page from 'components/Page';
import useMediaQuery from 'hooks/useMediaQuery';
import { useState } from 'react';
import Header from './components/Header';
import TabSection from './components/TabSection';
import tabsConfig from './tabsConfig';
import Overview from './views/Overview/Overview';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
function TabPanel(props: TabPanelProps) {
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
            <Container sx={{paddingTop: '40px'}}>
                {children}
            </Container>
        )}
        </div>
    );
}

const Dashboard = ({children}:any) => {
    const {isMobile} = useMediaQuery();
    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    return (
        <Page
            sx={{backgroundColor: theme => (theme.palette as any).extra.background.alt}}
        >
            <Header isMobile={isMobile}/>
            <TabSection value={value} handleChange={handleChange} />
            {
                tabsConfig.map((item,index) => 
                    <TabPanel key={item.label} value={value} index={index}>
                        {item.component}
                    </TabPanel>
                )
            }
        </Page>
    );
};

export default Dashboard;
