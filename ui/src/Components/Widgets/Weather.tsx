import { Box, Card, Paper, Typography } from "@mui/material";
import React, { useState, useEffect } from 'react';
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
    "weather": Array<any>
}
type WeatherResponse = {
    "lat": number,
    "lon": number,
    "timezone": string
    "timezone_offset": number,
    "current": CurrentWeatherFields,
    "minutely": Array<any>,
    "hourly": Array<any>,
    "daily": Array<any>,
    "alerts": Array<any>
};



export default function WeatherWidget(props: any) {
    const [weather, setWeather] = useState<WeatherResponse>();
    const lat = "38.892191877"
    const lon = "-77.0760674"
    const units = "imperial"
    const apiKey = "cada03226eb97a6bd8fe0ab96d7878df"

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}
        `)
            .then(response => {
                setWeather(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    console.log(weather)

    return (
        <Card raised sx={{backgroundColor:"red", height: "100%", width: "100%", p: 2 }}>
            <Typography variant="h1" component="div">{Math.round(weather?.current?.temp)}°F</Typography>
        </Card>
    )
}