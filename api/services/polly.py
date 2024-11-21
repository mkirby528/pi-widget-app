import boto3
import logging
from botocore.exceptions import ClientError
import os
import time

# Initialize a Polly client
polly_client = boto3.client('polly')

# Configure logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)

# Initialize S3 client
s3_client = boto3.client('s3')


def generate_speech(text: str, voice_id: str, expiration: int = 3600):
    print("About to generate speech")
    try:
        # Generate speech using Polly
        response = polly_client.synthesize_speech(
            Text=text,
            OutputFormat='mp3',
            VoiceId=voice_id
        )

        # Check if the response contains the audio stream
        if "AudioStream" in response:
            audio_stream = response['AudioStream']

            # Define S3 bucket and path for storing the audio file
            # Ensure this is set in your environment variables
            s3_bucket = os.getenv('S3_BUCKET_NAME')
            s3_key = f"audio/{int(time.time())}.mp3"

            # Upload the audio stream to S3
            with open("/tmp/temp_audio.mp3", 'wb') as f:
                # Save stream content to a temporary file
                f.write(audio_stream.read())
            s3_client.upload_file("/tmp/temp_audio.mp3", s3_bucket, s3_key)

            # Generate a presigned URL for the audio file in S3 (valid for the given expiration time)
            signed_url = s3_client.generate_presigned_url(
                'get_object',
                Params={'Bucket': s3_bucket, 'Key': s3_key},
                ExpiresIn=expiration
            )

            print(f"Returning signed URL: {signed_url}")
            return {"audio_url": signed_url}
        else:
            raise Exception("No audio stream returned from Polly API")

    except ClientError as e:
        logger.error(f"Polly client error: {e}")
        raise Exception(f"Error while calling Polly API: {e}")
    except Exception as e:
        logger.error(f"Error generating speech: {e}")
        raise Exception(f"Error while generating speech: {e}")
