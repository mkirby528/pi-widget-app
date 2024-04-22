import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, Stack, Typography, backdropClasses } from '@mui/material';

type TrainList = Array<TrainObject>
type TrainObject = {
    "line": string
    "destination": string
    "min_away": string
}


function getTrainHexColor(line: string): string {
    switch (line) {
        case "Orange": {
            return "#ED8B00"

        }
        case "Blue": {
            return "#009CDE"
        }

        case "Silver": {
            return "#919D9D"
        }
        case "Red": {
            return "#BF0D3E"

        }
        case "Green": {
            return "#00B140"

        }
        case "Yellow": {
            return "#FFD100"
        }
    }
}

function TrainRow(props: { train: TrainObject }): JSX.Element {
    const train = props.train
    const trainHexColor: string = getTrainHexColor(train.line)
    return <Box sx={{ p: 1, my: 1, backgroundColor: trainHexColor, width: "100%" }}>
        <Typography variant='h6'>{train.destination} - {train.min_away}</Typography>
    </Box>
}

export default function MetroWidget() {
    const [nextTrains, setNextTrains] = useState<TrainList>();

    const getMetroData = async () => {
        try {
            console.log("Calling metro api to get train data...")
            const response = await axios.get("/api/metro")
            setNextTrains(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getMetroData();

        const intervalCall = setInterval(() => {
            getMetroData();
        }, 30000); // Refresh every 30 seconds (30000 ms)
        return () => {
            clearInterval(intervalCall);
        };
    }, []);



    return (
        <Card raised sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "primary.main", height: "100%", width: "100%", p: 2 }}>
            <Typography variant='h6'>i like train</Typography>
            <Stack sx={{ width: "100%" }}>
                {nextTrains?.filter(value => value?.line != null).slice(0, 3)?.map(function (train: TrainObject, i) {
                    return <TrainRow train={train} key={i} />;
                })}
            </Stack>
        </Card>
    )
}



