from os import getenv

import requests


def speak(text):
    pi_host = getenv("PI_NGROK_HOST")
    body = {
        "text": text
    }
    headers = {
        "Content-Type": "application/json"
    }
    print(body)
    response = requests.post(f"{pi_host}/speak", headers=headers, json=body)
    print(response.content)
