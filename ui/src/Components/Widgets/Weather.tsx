import { Card, CardMedia, Typography } from "@mui/material";
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

    const getWeatherData = async () => {
        try {
            console.log("Calling open weather api to get weather data...")
            const response = await axios.get("/api/weather")
            setWeather(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getWeatherData();

        const intervalCall = setInterval(() => {
            getWeatherData();
        }, 300000); // Refresh every 5 min (300000 ms)
        return () => {
            clearInterval(intervalCall);
        };
    }, []);

    return (
        <Card raised sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "primary.main", height: "100%", width: "100%", p: 2 }}>
            <CardMedia
                component="img"
                height="140"
                image={`https://openweathermap.org/img/wn/${weather?.current.weather[0].icon}@2x.png`}
                alt="Weather Icon"
            />
            <Typography variant="h1" component="div">{Math.round(weather?.current?.temp)}°F</Typography>
        </Card>
    )
}

