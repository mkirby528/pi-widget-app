import requests
from os import getenv
from constants import API_ENDPOINTS
from logging import getLogger
logger = getLogger("pi-app-api")
from utils import get_google_access_token



def get_all_image_urls_for_album_id(album_id: str):
    photos = []
    access_token = get_google_access_token()
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
        logger.info(f"Google photo response status: {response.status_code}")
        urls = [f"{photo.get("baseUrl")}=w2048-h1024"
                for photo in response.json().get("mediaItems")]
        photos += urls
        next_page_token = response.json().get("nextPageToken", "")
        if not next_page_token:
            break
    logger.info(f"Returning {len(urls)} photo urls")
    return photos
