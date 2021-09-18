from flask import Flask, request
from transcribe import transcribe_video
from analyser import Analysis
app = Flask(__name__)


@app.route('/')
def index():
    return "Hello World"


@app.route("/upload_video", methods=['POST'])
def upload_video():
    # ensures the requested file is present
    if 'file' not in request.files:
        return {"error": "No file detected"}
    uploaded_file = request.files['file']
    if uploaded_file.filename != '':
        print("Saving file...")
        uploaded_file.save(uploaded_file.filename)
    uploaded = request.form.get(
        'uploaded') and request.form.get('uploaded') == "True"

    # transcribe and the perform analysis on the uploaded file
    transcript = transcribe_video(uploaded_file.filename, uploaded)
    analysis = Analysis(transcript)
    return {"analysis": analysis}


app.run("localhost", 5000, debug=True)
