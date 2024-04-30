import json
from typing import Union
import simplejson as json

def build_response(status_code: int, body: Union[dict, str, list]):
    body = {"message": body} if isinstance(body,str) else body
    return {
        "statusCode": status_code,
        "body": json.dumps(body,use_decimal=True)

    }
