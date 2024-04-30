import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import WeatherWidget from './Widgets/Weather';
import MetroWidget from './Widgets/Metro';
import AlbumReviewWidget from "./Widgets/AlbumReview"



function GridItem({widget}) {
    return (
        <Grid display="flex" justifyContent="center" alignItems="center" sx={{ height: "47.5vh" }} xs={4}>
            <Box display="flex" justifyContent="center" alignItems="center" component="section" sx={{
                height: "95%",
                width: "95%",
                backgroundColor: "primary.main"
            }}>{widget}</Box>
        </Grid>)
}

export default function HomePage(props: any) {
    return (
        <Grid container justifyContent="center" alignItems="center">
                <GridItem widget={<WeatherWidget/>} />
                <GridItem widget={<MetroWidget/>} />
                <GridItem widget={<AlbumReviewWidget/>} />

        </Grid>
    )
}
