from utils import get_google_access_token
from datetime import datetime
import requests


def get_calendar_events(num_events=25):
    access_token = get_google_access_token()
    minimum_time = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%fZ')

    url = f"https://www.googleapis.com/calendar/v3/calendars/primary/events"
    querystring = {"timeMin": minimum_time,
                   "orderBy": "startTime", "singleEvents": "true"}
    headers = {
        "Authorization": f"Bearer {access_token}"
    }
    respose = requests.get(url, headers=headers, params=querystring)
    calendar_items = respose.json().get("items")
    calendar_items = [
        {
            "event_title": item.get("summary"),
            "start_time": item.get("start",{}).get("date") or item.get("start",{}).get("dateTime"),
            "end_time": item.get("end",{}).get("date") or item.get("end",{}).get("dateTime")
        } for item in calendar_items]
    return calendar_items[:25]
