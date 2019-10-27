from flask import Flask, Response, render_template
from camera import VideoCamera

app = Flask(__name__)

@app.route("/")
def main():
    return render_template('index.html')

@app.route('/video_feed')
def video_feed():
    camera = VideoCamera()
    return Response(
        gen(camera), mimetype='multipart/x-mixed-replace; boundary=frame')

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

if __name__ == "__main__":
    app.run()