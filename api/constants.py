# Paths
from dataclasses import dataclass
from os import getenv
from enum import Enum
from typing import Optional
from pydantic import BaseModel, Field


API_BASE_PATH = "/api"

class PATHS():
    HEALTH_CHECK = f"{API_BASE_PATH}/health"
    GET_WEATHER = f"{API_BASE_PATH}/weather"
    GET_METRO_TIMES = f"{API_BASE_PATH}/metro"
    GET_ALBUMS_REVIEWS = f"{API_BASE_PATH}/album-reviews"
    GET_GOOGLE_PHOTOS = f"{API_BASE_PATH}/photos"
    GET_CALENDAR_EVENTS = f"{API_BASE_PATH}/calendar"
    CONTROL_BEDROOM_LIGHTS = f"{API_BASE_PATH}/smart-home/bedroom-lights"
    CONTROL_LIVING_ROOM_LIGHTS = f"{API_BASE_PATH}/smart-home/living-room-lights"
    GET_FANTASTY_FOOTBALL_SCORES=f"{API_BASE_PATH}/fantasy-football/get-scores"
    GET_FANTASTY_FOOTBALL_PLAYER_COUNTS=f"{API_BASE_PATH}/fantasy-football/get-player-counts"
    TRANSCRIBE_AUDIO=f"{API_BASE_PATH}/transcribe-audio"
    TEXT_TO_SPSEACH=f"{API_BASE_PATH}/text-to-speach"
    SPEAK=f"{API_BASE_PATH}/speak"

@dataclass
class OPEN_WEATHER_PARAMETERS():
    LATTITUDE = "38.892191877"  # Arlington, VA
    LONGITUDE = "-77.0760674"  # Arligton, VA
    UNITS = "imperial"
    EXCLUDE = "minutely,hourly,daily,alerts"
    API_KEY = getenv("OPEN_WEATHER_API_KEY")


@dataclass
class API_ENDPOINTS():
    OPEN_WEATHER = f"https://api.openweathermap.org/data/3.0/onecall?lat={
        OPEN_WEATHER_PARAMETERS.LATTITUDE}&lon={OPEN_WEATHER_PARAMETERS.LONGITUDE}&appid={OPEN_WEATHER_PARAMETERS.API_KEY}&exclude={OPEN_WEATHER_PARAMETERS.EXCLUDE}&units={OPEN_WEATHER_PARAMETERS.UNITS}"
    WMATA = f"https://api.wmata.com/StationPrediction.svc/json/GetPrediction/C05"
    GOOGLE_REFRESH_TOKEN = f"https://www.googleapis.com/oauth2/v4/token"
    GOOGLE_PHOTOS = "https://photoslibrary.googleapis.com/v1/mediaItems:search?access_token={access_token}"
    GOOGLE_CALENDAR = "https://www.googleapis.com/calendar/v3/calendars/{calendar_id}/events"

# Home Assistant
class LightStateEnum(str, Enum):
    ON = 'ON'
    OFF = 'OFF'

class LightModeEnum(str, Enum):
    FULL = 'FULL'
    HALF = "HALF"
    DIM = 'DIM'
    OFF = 'OFF'
    CUSTOM = 'CUSTOM'


class HomeAssistantLightConfig(BaseModel):
    entity_id: Optional[str] = Field(default=None)
    brightness_pct: Optional[int] = Field(default=None)
    kelvin: Optional[int] = Field(default=None)
    rgb_color: Optional[list[int]] = Field(default=None)


class LightControlBody(BaseModel):
    class Config:
        use_enum_values = True

    state: LightStateEnum = Field(default=LightStateEnum.ON)
    mode: LightModeEnum = Field(default=None)
    config: Optional[HomeAssistantLightConfig] = Field(
        default=HomeAssistantLightConfig())


class LightModeConfigurations(Enum):
    FULL = HomeAssistantLightConfig(brightness_pct=100, kelvin=2000)
    HALF = HomeAssistantLightConfig(brightness_pct=50, kelvin=2000)
    DIM = HomeAssistantLightConfig(brightness_pct=10, kelvin=2000)
    OFF = HomeAssistantLightConfig(brightness_pct=0)

class SpeakEndpointBody(BaseModel):
    text: str
