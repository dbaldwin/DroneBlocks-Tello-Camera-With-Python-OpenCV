import os
from flask import Flask, Response, render_template, request, jsonify
from lib.camera import Camera
from lib.udp import UDP

app = Flask(__name__)

# Set to true if doing ArUco detection
# Set to false to get camera stream with no detection enabled
detect_aruco_markers = False

@app.route("/")
def main():
    return render_template('index.html')

@app.route('/video_stream')
def video_feed():
    camera = Camera(detect_aruco_markers)
    return Response(get_frame(camera), mimetype='multipart/x-mixed-replace; boundary=frame')

def get_frame(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/send_command', methods=['POST'])
def send_command():
    command = request.json['command']
    udp.send_command(command)
    return ""

@app.route('/take_photo')
def take_photo():
    camera.take_photo()
    return ""

if __name__ == "__main__":
    udp = UDP()
    app.run()
