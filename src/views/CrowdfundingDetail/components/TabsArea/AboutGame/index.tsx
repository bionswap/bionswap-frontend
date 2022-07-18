import React from "react";
import styled from '@emotion/styled'
import { Box, Paper, Tabs, Tab, TableCell, TableBody, Table } from "@mui/material";
import Introduction from "./Introduction";
import IDOProcess from "../../IDOProcess";

interface AboutGameProps {
    data: any,
    isMobile: boolean
}

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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

function a11yProps(index: number) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const AboutGame: React.FC<AboutGameProps> = ({ data, isMobile = false }) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    const TabPanelCustom = styled(TabPanel)`
        flex: 1;
    `
    const TabCustom = styled(Tab)`
        font-weight: 500;
        font-size: 12px;
        line-height: 100%;
        color: ##787A9B;
        font-family: 'Inter', sans-serif;
        text-transform: inherit;
        align-items: flex-start;
        padding: 0;
        justify-content: flex-start;
        min-height: 0;
        margin-bottom: 20px;
        position: relative;

        &.Mui-selected {
            color: #0b0b0b;
            text-decoration: underline;
        }
    `
    const TabsCustom = styled(Tabs)`
        .MuiTabs-indicator {
            display: none;
        }
    `

    return (
        <Box display='flex' gap={3} sx={{ width: '100%' }} flexDirection={isMobile ? 'column' : 'row'}>
            <Box width={isMobile ? '100%' : '70%'}>
                <Box gap={4} sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}>
                    <TabsCustom
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example">
                        <TabCustom label="Introduction" {...a11yProps(0)} />
                        <TabCustom label="Team" {...a11yProps(1)} />
                        <TabCustom label="Tokennomics" {...a11yProps(2)} />
                    </TabsCustom>
                    <TabPanelCustom value={value} index={0}>
                        <Introduction data={data} isMobile={isMobile} />
                    </TabPanelCustom>
                    <TabPanelCustom value={value} index={1}>
                        Team
                    </TabPanelCustom>
                    <TabPanelCustom value={value} index={2}>
                        Tokennomics
                    </TabPanelCustom>
                </Box>
            </Box>
            <Box  width={isMobile ? '100%' : '30%'}>
                <IDOProcess data={data} isMobile={isMobile} />
            </Box>
        </Box >
    )
}

export default AboutGame;