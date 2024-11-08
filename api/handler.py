from typing import Annotated, Optional
from dotenv import load_dotenv, find_dotenv
from constants import PATHS, LightControlBody
from services.open_weather import get_weather
from services.wmata import get_next_trains
from services.album_reviews import get_random_reviews
from services.google_photos import get_all_image_urls_for_album_id
from services.google_calendar import get_calendar_events
from services.home_assistant import control_lights
# from services.fantasy_football import get_fantasy_football_scores,get_player_counts
from aws_lambda_powertools.event_handler import APIGatewayRestResolver, Response, content_types
import logging
from aws_lambda_powertools.event_handler.openapi.params import Query
from aws_lambda_powertools.event_handler.exceptions import NotFoundError


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
    return get_weather()


@app.get(PATHS.GET_METRO_TIMES)
def handle_get_metro_times():
    return get_next_trains()


@app.get(PATHS.GET_ALBUMS_REVIEWS)
def handle_get_album_reviews(n: Annotated[Optional[int], Query()] = 25):
    return get_random_reviews(n)


@app.get(PATHS.GET_GOOGLE_PHOTOS)
def handle_get_google_photos():
    return get_all_image_urls_for_album_id("AJXIcPf71Enk2vv3nB3kJ_KvOt14cZPkM4rQSFn5_h4aMh5gaCR2quwgc1FDSXAhUI4_tOGXcQwZ")


@app.get(PATHS.GET_CALENDAR_EVENTS)
def handle_get_calendar_events():
    return get_calendar_events()


@app.post(PATHS.CONTROL_LIVING_ROOM_LIGHTS)
def handle_control_bedroom_lights(settings: LightControlBody):
    settings.config.entity_id = "light.living_room_lights"
    control_lights(settings)
    return Response(status_code=204)


@app.post(PATHS.CONTROL_BEDROOM_LIGHTS)
def handle_control_bedroom_lights(settings: LightControlBody):
    settings.config.entity_id = "light.bedroom_lights"
    control_lights(settings)
    return Response(status_code=204)

# @app.get(PATHS.GET_FANTASTY_FOOTBALL_SCORES)
# def handle_get_fantast_football_scores():
#     return get_fantasy_football_scores()

# @app.get(PATHS.GET_FANTASTY_FOOTBALL_PLAYER_COUNTS)
# def handle_get_fantast_football_scores():
#     return get_player_counts()

@app.exception_handler(Exception)
def handle_exception(error: Exception):
    logger.error(f"Error: {str(error)}")
    return Response(status_code=500, body=f"Error: {str(error)}")


@app.not_found
def handle_not_found_errors(exc: NotFoundError) -> Response:
    logger.info(f"Not found route: {app.current_event.path}")
    return Response(status_code=404, content_type=content_types.TEXT_PLAIN, body="Route not found.")


def lambda_handler(event, context):
    logger.info(f"Lambda invoked successfully!")
    return app.resolve(event, context)
