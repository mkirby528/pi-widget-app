from constants import LightControlBody, LightStateEnum, LightModeEnum, LightModeConfigurations
import requests
from os import getenv
import logging
logger = logging.getLogger("pi-app-api")


def control_lights(settings: LightControlBody):
    logger.info(f"Settings passed in to control_lights: {settings} ")

    action = "turn_on" if settings.state == LightStateEnum.ON else "turn_off"
    settings.state = None
    entity_id = settings.config.entity_id

    data = getattr(LightModeConfigurations, settings.mode).value
    data.entity_id = entity_id
    data = data.model_dump(exclude_none=True)

    ha_host = getenv("HOME_ASSISTANT_HOST")
    request_url = f"{ha_host}/api/services/light/{action}"
    headers = {
        "Authorization": f"Bearer {getenv("HOME_ASSISTANT_TOKEN")}"
    }

    logger.info(
        f"Calling Home Assistant to configure lights with settings: {data}")
    response = requests.post(url=request_url, json=data, headers=headers)
    if response.status_code > 299:
        raise Exception(f"Bad response from home assistent: Code: {
                        response.status_code}, content: {response.content}")
