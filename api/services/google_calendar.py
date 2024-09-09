from utils import get_google_access_token
from datetime import datetime
import requests
from constants import API_ENDPOINTS
from dateutil.parser import parse


def get_calendar_events(calendar_id="primary", num_events=25):
    access_token = get_google_access_token()
    minimum_time = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%fZ')

    querystring = {"timeMin": minimum_time,
                   "orderBy": "startTime", "singleEvents": "true"}
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    respose = requests.get(API_ENDPOINTS.GOOGLE_CALENDAR.format(
        calendar_id=calendar_id), headers=headers, params=querystring)
    calendar_items = respose.json().get("items")
    calendar_items = [
        {
            "event_title": item.get("summary"),
            "start_time": parse(item.get("start", {}).get("date") or item.get("start", {}).get("dateTime")),
            "end_time": parse(item.get("end", {}).get("date") or item.get("end", {}).get("dateTime")),
            "color": item.get("colorId", "0")
        } for item in calendar_items[:num_events]]
    return calendar_items
