from dotenv import load_dotenv, find_dotenv
from constants import PATHS
from os import getenv
from utils import build_response
from services.open_weather import get_weather
from services.wmata import get_next_trains
import logging
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(message)s',
    datefmt='%H:%M:%S'
)


logger = logging.getLogger("pi-app-api")


def lambda_handler(event, context):
    try:
        logger.info(f"Lambda invoked successfully!")
        load_dotenv(find_dotenv())

        path = event.get("path")
        method = event.get("httpMethod")
        logger.info(f"Recieved request to {path}")

        if path == PATHS.HEALTH_CHECK and method == "GET":
            return build_response(200, "SUCCESS")
        if path == PATHS.GET_WEATHER and method == "GET":
            return build_response(200, get_weather())
        if path == PATHS.GET_METRO_TIMES and method == "GET":
            return build_response(200, get_next_trains())
        else:
            return build_response(404, "Endpoint not found")
    except Exception as error:
        logger.error(f"Error encountered: {str(error)}")
        return build_response(500, str(error))
