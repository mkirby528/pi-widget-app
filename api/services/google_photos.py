import requests
from os import getenv
from constants import API_ENDPOINTS
from logging import getLogger
logger = getLogger("pi-app-api")


def get_access_token():
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


def get_all_image_urls_for_album_id(album_id: str):
    photos = []
    access_token = get_access_token()
    print(access_token)
    url = f"https://photoslibrary.googleapis.com/v1/mediaItems:search?access_token={
        access_token}"
    request_body = {
        "albumId": album_id,
        "pageSize": 100
    }
    next_page_token = ""
    while True:
        if next_page_token:
            request_body["pageToken"] = next_page_token
        response = requests.post(url, request_body)
        logger.info(f"Google photo response: {response.json()}")
        urls = [f"{photo.get("baseUrl")}=w2048-h1024"
                for photo in response.json().get("mediaItems")]
        photos += urls
        next_page_token = response.json().get("nextPageToken", "")
        if not next_page_token:
            break
    logger.info(f"Returning {len(urls)} photo urls")
    return photos
