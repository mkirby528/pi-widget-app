import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Typography } from '@mui/material';

type TrainList = Array<TrainObject>
type TrainObject = {
    "line": String
    "destination": String
    "min_away": String
}



function TrainRow(props: {train: TrainObject}): JSX.Element {
    const train = props.train
    return <div>{`${train.line}-${props.train.destination}-${train.min_away}`}</div>
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
            <Typography variant='h3'>i like train</Typography>
            {nextTrains?.map(function (train:TrainObject, i) {
                return <TrainRow train={train} key={i} />;
            })}
        </Card>
    )
}



