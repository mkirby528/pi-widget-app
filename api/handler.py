from typing import List, Optional
from aws_lambda_powertools.shared.types import Annotated  
from dotenv import load_dotenv, find_dotenv
from constants import PATHS
from services.open_weather import get_weather
from services.wmata import get_next_trains
from services.album_reviews import get_random_reviews
from services.google_photos import get_all_image_urls_for_album_id
from services.google_calendar import get_calendar_events
from aws_lambda_powertools.event_handler import APIGatewayRestResolver,Response
import logging
from aws_lambda_powertools.event_handler.openapi.params import Query  

load_dotenv(find_dotenv())

logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] %(message)s',
    datefmt='%H:%M:%S'
)
logger = logging.getLogger("pi-app-api")

app = APIGatewayRestResolver(enable_validation=True)



@app.get(PATHS.HEALTH_CHECK)
def health_check():
    return "Success"

@app.get(PATHS.GET_WEATHER)
def handle_get_weather():
    return  get_weather()

@app.get(PATHS.GET_METRO_TIMES)
def handle_get_metro_times():
    return get_next_trains()


@app.get(PATHS.GET_ALBUMS_REVIEWS)
def handle_get_album_reviews(n: Annotated[Optional[int], Query()] = 25):
    return get_random_reviews(n)

@app.get(PATHS.GET_GOOGLE_PHOTOS)
def handle_get_google_photos():
    return get_all_image_urls_for_album_id("AJXIcPcuTrNuHkKiFcK7_UjFGvqfrNkUZ52CDUuZXoC3tDE3c3iw_35ItkmdpeccSuEzfKTc9Qnv")


@app.get(PATHS.GET_CALENDAR_EVENTS)
def handle_get_calendar_events():
    return get_calendar_events()

@app.exception_handler(Exception)
def handle_exception(error:Exception):
    logger.error(f"Error: {str(error)}")
    return Response(status_code=500,body=f"Error: {str(error)}")


def lambda_handler(event, context):
    logger.info(f"Lambda invoked successfully!")
    return app.resolve(event, context)

