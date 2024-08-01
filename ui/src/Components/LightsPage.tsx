import { Box, Tab, Tabs, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import axios from 'axios';
import { CirclePicker } from "react-color"


interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    selectedTab: number;

}

function CustomTabPanel(props: TabPanelProps) {
    const { children, selectedTab, index, ...other } = props;
    const [livingRoomValue, setLivingRoomValue] = React.useState(['off']);
    const [bedroomValue, setBedroomValue] = React.useState(['off']);

    async function handleLivingRoomBrightnessChange(event, newValue) {
        if (newValue !== null) {


            const state = newValue === "OFF" ? "OFF" : "ON"
            setLivingRoomValue(newValue);
            const request_body = {
                "state": state,
                "mode": newValue
            }
            const response = await axios.post("/api/smart-home/living-room-lights", request_body)
        }
    }
    async function handleBedroomBrightnessChange(event, newValue) {
        if (newValue !== null) {


            const state = newValue === "OFF" ? "OFF" : "ON"
            setLivingRoomValue(newValue);
            const request_body = {
                "state": state,
                "mode": newValue
            }
            const response = await axios.post("/api/smart-home/bedroom-lights", request_body)
        }
    }
    async function handleLivingRoomColorChange(color, event) {
        console.log(color)
        const request_body = {
            "state": "ON",
            "mode": "CUSTOM",
            "config": {
                "rgb_color": [color.rgb.r.toString(), color.rgb.g.toString(), color.rgb.b.toString()],
                "brightness_pct": 100
            }
        }
        try {
            console.log("Calling living-room lights api...")
            const response = await axios.post("/api/smart-home/living-room-lights", request_body)
            console.log(response)

        } catch (e) {
            console.log("matthew")
            console.log(e)
        }

    }
    async function handleBedroomColorChange(color, event) {
        console.log(color)
        const request_body = {
            "state": "ON",
            "mode": "CUSTOM",
            "config": {
                "rgb_color": [color.rgb.r.toString(), color.rgb.g.toString(), color.rgb.b.toString()],
                "brightness_pct": 100
            }
        }
        try {
            console.log("Calling living-room lights api...")
            const response = await axios.post("/api/smart-home/bedroom-lights", request_body)
            console.log(response)

        } catch (e) {
            console.log("matthew")
            console.log(e)
        }

    }


    return (
        <div
            role="tabpanel"
            hidden={selectedTab !== index}
            id={`simple-tabpanel-${index}`}
            style={{
                "height": "81%",
                "width": "100%",
            }}
        >
            {selectedTab === index && <Box sx={{ p: 3 }}>                <ToggleButtonGroup
                color="primary"
                exclusive
                value={selectedTab == 0 ? livingRoomValue : bedroomValue}
                size='large'
                onChange={selectedTab == 0 ? handleLivingRoomBrightnessChange : handleBedroomBrightnessChange}
            >
                <ToggleButton key="OFF" value="OFF" >
                    <NightlightRoundIcon />
                </ToggleButton>
                <ToggleButton key="DIM" value="DIM">
                    <Brightness5Icon />
                </ToggleButton>
                <ToggleButton key="HALF" value="HALF">
                    <Brightness6Icon />
                </ToggleButton>
                <ToggleButton key="FULL" value="FULL">
                    <Brightness7Icon />
                </ToggleButton>
            </ToggleButtonGroup>
                <CirclePicker onChange={selectedTab == 0 ? handleLivingRoomColorChange : handleBedroomColorChange} /></Box>}
        </div>
    );
}


export default function LightsPage(props: any) {
    const [selectedTab, setSelectedTab] = React.useState(0);


    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Grid p={1} container sx={{ backgroundColor: "black", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: "100%", width: "100%" }}>
            <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Living Room" />
                <Tab label="Bedroom" />
            </Tabs>

            <CustomTabPanel selectedTab={selectedTab} index={0}></CustomTabPanel>
            <CustomTabPanel selectedTab={selectedTab} index={1}>

</CustomTabPanel>
        </Grid >
    )
}
