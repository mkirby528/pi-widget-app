
import requests
from constants import API_ENDPOINTS
from os import getenv
from logging import getLogger
logger = getLogger("pi-app-api")

TRAIN_LINE_MAPPING = {"SV": "Silver",
                      "OR": "Orange",
                      "BL": "Blue",
                      "RD": "Red",
                      "GR": "Green",
                      "YL": "Yellow"}


def get_next_trains():
    # Call WMATA API
    uri = API_ENDPOINTS.WMATA
    HEADERS = {
        "api_key": getenv("WMATA_API_KEY")
    }
    response = requests.get(uri, headers=HEADERS)
    incoming_trains = response.json().get('Trains', [])
    logger.info(response.json)

    # Format Response
    formatted_trains = []
    for train in incoming_trains:
        formatted_train_data = {
            "line": TRAIN_LINE_MAPPING.get(train.get("Line")),
            "destination": train.get("DestinationName"),
            "min_away": train.get("Min")

        }
        formatted_trains.append(formatted_train_data)
    return formatted_trains
