import { Box, Card, CardMedia, Typography } from "@mui/material";
import { useState, useEffect } from 'react';
import axios from 'axios';

type CurrentWeatherFields = {
    "dt": number,
    "sunrise": number,
    "sunset": number,
    "temp": number,
    "feels_like": number,
    "pressure": number,
    "humidity": number,
    "dew_point": number,
    "uvi": number,
    "clouds": number,
    "visibility": number,
    "wind_speed": number,
    "wind_deg": number,
    "wind_gust": number,
    "weather": Array<WeatherFields>
}
type WeatherResponse = {
    "lat": number,
    "lon": number,
    "timezone": string
    "timezone_offset": number,
    "current": CurrentWeatherFields,
};
type WeatherFields = {
    "id": number,
    "main": String,
    "description": String,
    "icon": String
}

export default function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherResponse>();



    useEffect(() => {

        const getWeatherData = async () => {
            try {
                console.log("Calling open weather api to get weather data...")
                const response = await axios.get("/api/weather")
                setWeather(response.data)
            } catch (e) {
                console.log(e)
            }
        }

        const intervalCall = setInterval(() => {
            getWeatherData();
        }, 300000); // Refresh every 5 min (300000 ms)

        getWeatherData();

        return () => {
            clearInterval(intervalCall);
        };

    }, []);

    console.log(weather)
    return (

        <Card sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "primary.main", height: "100%", width: "100%" }}>
            <CardMedia
                component="img"
                height="120px"
                image={`https://openweathermap.org/img/wn/${weather?.current.weather[0].icon}@2x.png`}
                alt="Weather Icon"
            />
            <Typography variant="h2" component="div">{Math.round(weather?.current?.temp)}°F</Typography>
            <Box sx={{ width: "95%", display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                <Typography variant="h6">Feels Like: {Math.round(weather?.current?.feels_like)}°F</Typography>
                <Typography variant="h6">Humidity: {Math.round(weather?.current?.humidity)}</Typography>
            </Box>
            <Box sx={{ width: "95%", display: "flex", flexDirection: "row", justifyContent: "space-around" }}>

                <div style={{ display: "flex", flexDirection: "row" }}><img src="/assets/sunrise.png"></img> <Typography >{new Date(weather?.current?.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography></div>
                <div style={{ display: "flex", flexDirection: "row" }}><img src="/assets/sunset.png"></img> <Typography >{new Date(weather?.current?.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Typography></div>
                <div style={{ display: "flex", flexDirection: "row" }}><img src="/assets/wind.png"></img> <Typography >{Math.round(weather?.current?.wind_speed)} mph</Typography></div>

            </Box>

        </Card>
    )
}

