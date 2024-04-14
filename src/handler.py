from dotenv import load_dotenv, find_dotenv
from constants import PATHS
from os import getenv
from utils import build_response
from services.open_weather import get_weather
import logging
logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(message)s',
    datefmt='%H:%M:%S'
)


logger = logging.getLogger("pi-app-api")


def lambda_handler(event, context):
    """Sample pure Lambda function

    Parameters
    ----------
    event: dict, required
        API Gateway Lambda Proxy Input Format

        #api-gateway-simple-proxy-for-lambda-input-format
        Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html

    context: object, required
        Lambda Context runtime methods and attributes

        Context doc: https://docs.aws.amazon.com/lambda/latest/dg/python-context-object.html

    Returns
    ------
    API Gateway Lambda Proxy Output Format: dict

        Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
    """
    logger.info(f"Lambda invoked successfully!!")
    load_dotenv(find_dotenv())
    path = event.get("path")
    logger.info(f"Recieved request to {path}")
    if path == PATHS.HEALTH_CHECK:
        return build_response(200, "SUCCESS")
    if path == PATHS.GET_WEATHER:

        return build_response(200, get_weather())
    else:
        return build_response(404, "Endpoint not found")
