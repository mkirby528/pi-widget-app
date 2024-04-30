from dotenv import load_dotenv, find_dotenv
from constants import PATHS
from os import getenv
from utils import build_response
from services.open_weather import get_weather
from services.wmata import get_next_trains
from services.album_reviews import get_random_reviews
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
        query_params = event.get("queryStringParameters", {})
        logger.info(f"Recieved request to {path}")
        logger.info(f"Query Params: {query_params}")

        if path == PATHS.HEALTH_CHECK and method == "GET":
            return build_response(200, "SUCCESS")
        if path == PATHS.GET_WEATHER and method == "GET":
            return build_response(200, get_weather())
        if path == PATHS.GET_METRO_TIMES and method == "GET":
            return build_response(200, get_next_trains())
        if path == PATHS.GET_ALBUMS_REVIEWS and method == "GET":
            limit = int(query_params.get("n", 25)) if query_params else 25
            return build_response(200, get_random_reviews(limit))
        else:
            return build_response(404, "Endpoint not found")
    except Exception as error:
        logger.error(f"Error encountered: {str(error)}")
        return build_response(500, str(error))
