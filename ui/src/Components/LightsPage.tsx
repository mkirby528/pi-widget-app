import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness6Icon from '@mui/icons-material/Brightness6';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import axios from 'axios';

export default function LightsPage(props: any) {
    const [value, setValue] = React.useState(['off']);

    return (
        <Grid p={2} container sx={{ backgroundColor: "slategrey",display: "flex", flexDirection: "column", height: "100%", width: "100%", justifyContent: "left", alignItems: "top" }}>

            <Box sx={{ display: "flex", height: "50%", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                Living Room Lights
                <ToggleButtonGroup
                    color="primary"
                    exclusive
                    value={value}
                    size='large'
                    onChange={async (event, newValue) => {
                        if (newValue !== null) {


                            const state = newValue === "OFF" ? "OFF" : "ON"
                            setValue(newValue);
                            const request_body = {
                                "state": state,
                                "mode": newValue
                            }
                            const response = await axios.post("/api/smart-home/living-room-lights", request_body)
                            console.log(response);
                        }
                    }}
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
            </Box>

            <Box sx={{ display: "flex", height: "50%", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                Bedroom Lights
                <ToggleButtonGroup
                    color="primary"
                    exclusive
                    value={value}
                    size='large'
                    onChange={async (event, newValue) => {
                        if (newValue !== null) {


                            const state = newValue === "OFF" ? "OFF" : "ON"
                            setValue(newValue);
                            const request_body = {
                                "state": state,
                                "mode": newValue
                            }
                            const response = await axios.post("/api/smart-home/bedroom-lights", request_body)
                            console.log(response);
                        }
                    }}
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
            </Box>
        </Grid >
    )
}
