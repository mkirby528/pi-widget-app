import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
// import WeatherWidget from './Widgets/Weather';




function GridItem(props: any) {
    return (
        <Grid display="flex" justifyContent="center" alignItems="center" sx={{ height: "47.5vh" }} xs={4}>
            <Box display="flex" justifyContent="center" alignItems="center" component="section" sx={{
                height: "95%",
                width: "95%", 
                backgroundColor:"primary.main"
            }} color="primary">Howdy</Box>
        </Grid>)
}

export default function HomePage(props: any) {
    return (
        <Grid container justifyContent="center" alignItems="center">
            {Array(6).fill(null).map((index) => (
                <GridItem key={index} />
            ))}
        </Grid>
    )
}
