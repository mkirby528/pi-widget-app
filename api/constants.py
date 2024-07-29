# Paths
from dataclasses import dataclass
from os import getenv
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


API_BASE_PATH = "/api"


class PATHS():
    HEALTH_CHECK = f"/api/health"
    GET_WEATHER = f"/api/weather"
    GET_METRO_TIMES = f"/api/metro"
    GET_ALBUMS_REVIEWS = f"/api/album-reviews"
    GET_GOOGLE_PHOTOS = f"/api/photos"
    GET_CALENDAR_EVENTS = f"/api/calendar"
    CONTROL_BEDROOM_LIGHTS = f"/api/smart-home/bedroom-lights"


@dataclass
class OPEN_WEATHER_PARAMETERS():
    LATTITUDE = "38.892191877"  # Arlington, VA
    LONGITUDE = "-77.0760674"  # Arligton, VA
    UNITS = "imperial"
    EXCLUDE = "minutely,hourly,daily,alerts"
    API_KEY = getenv("OPEN_WEATHER_API_KEY")


@dataclass
@dataclass
class API_ENDPOINTS():
    OPEN_WEATHER = f"https://api.openweathermap.org/data/3.0/onecall?lat={
        OPEN_WEATHER_PARAMETERS.LATTITUDE}&lon={OPEN_WEATHER_PARAMETERS.LONGITUDE}&appid={OPEN_WEATHER_PARAMETERS.API_KEY}&exclude={OPEN_WEATHER_PARAMETERS.EXCLUDE}&units={OPEN_WEATHER_PARAMETERS.UNITS}"
    WMATA = f"https://api.wmata.com/StationPrediction.svc/json/GetPrediction/C05"
    GOOGLE_REFRESH_TOKEN = f"https://www.googleapis.com/oauth2/v4/token"
    GOOGLE_PHOTOS = "https://photoslibrary.googleapis.com/v1/mediaItems:search?access_token={access_token}"
    GOOGLE_CALENDAR = "https://www.googleapis.com/calendar/v3/calendars/{calendar_id}/events"


class LightStateEnum(str, Enum):
    on = 'on'
    off = 'off'


class LightControlSettings(BaseModel):
    class Config:  
        use_enum_values = True  

    state: LightStateEnum
    entity_id: Optional[str] = Field(default=None)
    brightness_pct: Optional[str] = Field(default=None)
    color_temp_kelvin: Optional[int] = Field(default=None)
    rgb_color: Optional[list[int]] = Field(default=None)
