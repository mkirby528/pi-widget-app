import json
from typing import Union


def build_response(status_code: int, body: Union[dict, str]):
    body = {"message": body} if isinstance(body,str) else body
    return {
        "statusCode": status_code,
        "body": json.dumps(body)

    }
