from constants import API_ENDPOINTS
import requests

from logging import getLogger
logger = getLogger("pi-app-api")


def get_weather():
    data = call_open_weather_api()
    logger.info(data)
    return data


def call_open_weather_api():
    return requests.get(API_ENDPOINTS.OPEN_WEATHER).json()
