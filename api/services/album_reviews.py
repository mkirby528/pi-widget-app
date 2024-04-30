import random
import boto3
from os import getenv
from logging import getLogger
logger = getLogger("pi-app-api")

logger.info("HERE")
REVIEW_TABLE_NAME = getenv("ALBUM_REVIEW_TABLE_NAME")
logger.info(f"name: {REVIEW_TABLE_NAME}")

dynamodb_resource = boto3.resource("dynamodb")
review_table = dynamodb_resource.Table(REVIEW_TABLE_NAME)


def get_random_reviews(number):
    print("Getting all album reviews")
    albums = review_table.scan().get("Items")
    random_selection = random.choices(albums, k=number)
    keys_to_select = ['Title', 'ArtistsString', 'ReleaseYear','CoverImage','HaveVinyl','Rating']
    random_selection =[dict((k,album[k]) for k in keys_to_select if k in album) for album in random_selection]



    return random_selection
