from flask import Flask
from flask import request
from transcribe import transcribe_video

app = Flask(__name__)

@app.route('/')
def index():
    return "Hello World"

@app.route("/upload_video", methods=['POST'])
def upload_video():
    uploaded_file = request.files['file']
    print("Here")
    if uploaded_file.filename != '':
        uploaded_file.save(uploaded_file.filename)
    uploaded = request.form.get('uploaded') and request.form.get('uploaded') == "True"
    return {"transcript":transcribe_video(uploaded_file.filename, uploaded)}
    return {}

app.run("localhost", 3000, debug=True)