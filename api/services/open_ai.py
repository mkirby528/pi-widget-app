import tempfile
from time import sleep
from openai import OpenAI, AuthenticationError, OpenAIError
from io import BytesIO
from os import getenv

client = OpenAI(api_key=getenv("OPENAI_API_KEY"))


def transcribe_audio(file_path):
    """
    Transcribes the given audio file using OpenAI's Whisper model.
    """
    try:
        transcription_response = client.audio.transcriptions.create(
            model="whisper-1",
            file=open(file_path, "rb")
        )

        # Return the transcription text
        return transcription_response.text

    except AuthenticationError:
        return "Error: Invalid API key. Please check your OpenAI API key."

    except OpenAIError as e:
        return f"OpenAI API error: {str(e)}"

    except Exception as e:
        # Catch any other unexpected errors
        return f"Unexpected error: {str(e)}"


def generate_response_from_transcript(transcript):
    """
    Generates a response using OpenAI's GPT model based on the transcription text.
    """
    try:
        print(transcript)
        # Send the transcription to GPT for a response
        gpt_response = client.chat.completions.create(
            model="gpt-4o-mini",  # You can use any available GPT model
            messages=[
                {"role": "system", "content": "You are the voice assistant for a smart home system \
                 intended to replace a google home. keep in mimd that you will be speaking out your \
                  answers so don't be too wordy. Be as honest and truthful as you can and do not \
                 hallucinate. Feel free to use variety in the way that you answer so long as it is the \
                 truth, not a lie, and not deceptive in any way shape or form. Feel free to have fun or be funny sometimes too."},
                {"role": "user", "content": transcript}
            ],
            max_tokens=150,  # You can adjust this value based on your needs
            temperature=0.8  # Adjust creativity level
        )

        # Return the generated response text
        return gpt_response.choices[0].message.content

    except Exception as e:
        # Catch any other unexpected errors
        return f"Unexpected error while generating response: {str(e)}"
