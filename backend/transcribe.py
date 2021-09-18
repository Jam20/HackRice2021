from helpers import mp4_2_wav, upload_2_bucket, get_transcription, write_2_disk, delete_temp
from dotenv import load_dotenv
import os
# gets environement variables
load_dotenv()


def transcribe_video(input, uploaded=False):
    # Sets up basic variables for processing a video
    AUDIO_OUTPUT = "converted_audio.wav"
    TRANSCRIPT_OUTPUT = "transcript"
    BUCKET_NAME = os.environ["BUCKET_NAME"]
    SOURCE_FILE_NAME = AUDIO_OUTPUT
    DESTINATION_BLOB_NAME = SOURCE_FILE_NAME
    GCS_URI = "gs://%s/%s" % (BUCKET_NAME, DESTINATION_BLOB_NAME)

    # converts and uploads the audio file
    if not uploaded:
        mp4_2_wav(input, AUDIO_OUTPUT)
        upload_2_bucket(BUCKET_NAME, SOURCE_FILE_NAME, DESTINATION_BLOB_NAME)

    # gets the transcript and writes it to the disk
    transcript = get_transcription(GCS_URI)
    # write_2_disk(TRANSCRIPT_OUTPUT, transcript)
    delete_temp([AUDIO_OUTPUT])
    return transcript
