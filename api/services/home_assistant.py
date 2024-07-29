from constants import LightControlSettings, LightStateEnum
import requests
from os import getenv


def control_lights(settings: LightControlSettings):
    action = "turn_on" if settings.state == LightStateEnum.on else "turn_off"
    settings.state = None
    data = settings.model_dump_json(exclude_none=True)
    ha_host = getenv("HOME_ASSISTANT_HOST")
    request_url = f"{ha_host}/api/services/light/{action}"
    headers = {
        "Authorization": f"Bearer {getenv("HOME_ASSISTANT_TOKEN")}"
    }
    
    print(f"Calling Home Assistant to configure lights with settings: {data}") 
    response = requests.post(url=request_url, data=data, headers=headers)
    if response.status_code > 299:
        raise Exception(f"Bad response from home assistent: Code: {response.status_code}, content: {response.content}")