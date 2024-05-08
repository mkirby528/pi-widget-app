import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Card, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

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



export default function MetroWidget() {
    const [nextTrains, setNextTrains] = useState<TrainList>([]);
    const [pageNumber, setPageNumber] = useState<number>(0)

    const trainsPerPage = 3;
    const pageTrains = nextTrains.slice(pageNumber * trainsPerPage, trainsPerPage * (pageNumber + 1))
    const numPages = Math.ceil(nextTrains.length / trainsPerPage);

    const getMetroData = async () => {
        try {
            console.log("Calling metro api to get train data...")
            const response = await axios.get("/api/metro")
            setNextTrains(response.data.filter(value => value?.line != null))
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        const intervalCall = setInterval(() => {
            getMetroData();
        }, 30000); // Refresh every 30 seconds (30000 ms)
        return () => {
            clearInterval(intervalCall);
        };
    }, []);

    useEffect(() => {
        const timeout = setInterval(() => {
            if (nextTrains.length === 0) {
                console.log(`updating metro page from to 0`)
                setPageNumber(0)

            } else {
                const newPageNumber = (pageNumber + 1) % numPages
                console.log(`updating metro page from ${pageNumber} to ${newPageNumber}`)
                setPageNumber(newPageNumber)
            }
        }, 10000) // New Page 10 sec;

        return () => {
            clearTimeout(timeout);
        };
    }, [nextTrains, pageNumber, numPages]);






    const textStyle = {
        // textShadow: "0.07em 0 black,0 0.07em black,-0.07em 0 black,0 -0.07em black"
    };

    function TrainRow(props: { train: TrainObject }): JSX.Element {
        const train = props.train
        const trainHexColor: string = getTrainHexColor(train.line)
        return (
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", p: 1, my: 2, backgroundColor: trainHexColor }}>
                <Typography style={textStyle} variant='h6'>{train.destination}</Typography>
                <Typography style={textStyle} variant='h6'>{train.min_away}</Typography>
            </Box>)
    }

    getMetroData();


    return (
            <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "primary.main", height: "100%", width: "100%", p: 2 }}>
                <Typography variant='h6'>rosslyn {nextTrains.length > 0 ? "have" : "no"} train.</Typography>
                <Grid sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
                    {pageTrains.map(function (train: TrainObject, i) {
                        return <Grid key={i + train.destination} xs={12}><TrainRow train={train} /></Grid>;
                    })}
                </Grid>
            </Card>
    )
}



