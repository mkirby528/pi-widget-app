import json
from typing import Union
import simplejson as json
import requests
from os import getenv
from logging import getLogger
logger = getLogger("pi-app-api")
from constants import API_ENDPOINTS


def get_google_access_token():
    client_id = getenv("GOOGLE_CLIENT_ID", "")
    client_secret=  getenv("GOOGLE_CLIENT_SECRET", "")
    refresh_token = getenv("GOOGLE_REFRESH_TOKEN", "")

    request_body = {
        "client_id": client_id,
        "client_secret": client_secret,
        "refresh_token": refresh_token,
        "grant_type": "refresh_token"

    }
    response = requests.post(API_ENDPOINTS.GOOGLE_REFRESH_TOKEN, request_body)
    logger.info(f"Response status from refresh token call: {response.status_code}")
    return response.json().get("access_token")


