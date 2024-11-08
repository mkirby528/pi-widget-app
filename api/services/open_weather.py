from constants import API_ENDPOINTS
from error_handling.exceptions import OpenWeatherException
import requests

from logging import getLogger
logger = getLogger("pi-app-api")


def get_weather():
    try:
        logger.info("Calling Open Weather API to fetch weather...")
        response = requests.get(API_ENDPOINTS.OPEN_WEATHER)
        if response.status_code != 200:
            raise Exception(f"Bad response from Open Weather API. Status code {response.status_code}. Message: {response.text}")
        return response.json()

    except Exception as error:
        raise OpenWeatherException(f"Error fetching weather: {str(error)}") from error
