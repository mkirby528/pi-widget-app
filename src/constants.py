# Paths
from dataclasses import dataclass
from os import getenv


@dataclass
class OPEN_WEATHER_PARAMETERS():
    LATTITUDE = "38.892191877"
    LONGITUDE = "-77.0760674"
    UNITS = "imperial"
    API_KEY = getenv("OPEN_WEATHER_API_KEY")


@dataclass
class PATHS():
    HEALTH_CHECK = "/health"
    GET_WEATHER = "/weather"


@dataclass
class API_ENDPOINTS():
    OPEN_WEATHER = f"https://api.openweathermap.org/data/3.0/onecall?lat={
        OPEN_WEATHER_PARAMETERS.LATTITUDE}&lon={OPEN_WEATHER_PARAMETERS.LONGITUDE}&appid={OPEN_WEATHER_PARAMETERS.API_KEY}&units={OPEN_WEATHER_PARAMETERS.UNITS}"
