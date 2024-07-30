from constants import LightControlBody, LightStateEnum, LightModeEnum, LightModeConfigurations, HomeAssistantLightConfig
import requests
from os import getenv
import logging
logger = logging.getLogger("pi-app-api")


def control_lights(settings: LightControlBody):
    logger.info(f"Settings passed in to control_lights: {settings} ")

    entity_id = settings.config.entity_id
    action = "turn_off"
    if settings.state == LightStateEnum.ON:
        action = "turn_on"
        match settings.mode:
            case LightModeEnum.STANDARD:
                data = LightModeConfigurations.STANDARD.value
            case LightModeEnum.DIM:
                data = LightModeConfigurations.DIM.value
            case LightModeEnum.CUSTOM:
                data = settings.config
        data.entity_id = entity_id
        data = data.model_dump(exclude_none=True)
    else:
        data = HomeAssistantLightConfig(
            entity_id=entity_id).model_dump(exclude_none=True)

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
