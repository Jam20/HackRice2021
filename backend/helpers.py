import moviepy.editor as mp
import speech_recognition as sr
from google.cloud import storage, speech
import os

def mp4_2_wav(input, output):
    clip = mp.VideoFileClip(input)
    clip.audio.write_audiofile(output, ffmpeg_params=["-ac", "1"])  # Mono channel

def upload_2_bucket(bucket, source, destination):
    print("Uploading wav to GCP...")
    storage_client = storage.Client()
    bucket = storage_client.bucket(bucket)
    blob = bucket.blob(destination)
    blob.upload_from_filename(source)
    print("File {} uploaded to {}.".format(source, destination))

def get_transcription(uri):
    # Transcribe from GCP Bucket
    client = speech.SpeechClient()

    audio = speech.RecognitionAudio(uri=uri)
    config = speech.RecognitionConfig(
        language_code="en-US",
        enable_automatic_punctuation=True,
        enable_word_time_offsets=True
    )

    operation = client.long_running_recognize(config=config, audio=audio)

    print("Transcribing audio...")
    response = operation.result()
    return " ".join([result.alternatives[0].transcript for result in response.results])

def write_2_disk(file_name, data):
    print("Writing transcript to disk...")
    with open(file_name, "w") as f:
        f.write(data)
        print("Done writing to disk")

def delete_temp(files):
    print("Deleting temporary files...")
    for file in files:
        os.remove(file)