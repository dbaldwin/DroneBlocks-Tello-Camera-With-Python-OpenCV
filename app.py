import os
from flask import Flask, Response, render_template, request, jsonify
from lib.camera import Camera
from lib.udp import UDP
from lib.telemetry import Telemetry
from lib.drone import Drone

app = Flask(__name__)

@app.route("/")
def main():
    return render_template('index.html')

@app.route('/video_stream')
def video_feed():
    camera.get_video()
    return Response(get_frame(camera), mimetype='multipart/x-mixed-replace; boundary=frame')

def get_frame(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route("/connect")
def connect():
    status = udp.send_command("command")

    print("Connection status is: ", status)

    if status == "ok":
        drone.is_connected = True
    else:
        drone.is_connected = False
    
    return drone.toJSON()

@app.route("/status")
def status():
    return drone.toJSON()

@app.route('/send_command', methods=['POST'])
def send_command():
    command = request.json['command']
    response = udp.send_command(command)
    return response

@app.route('/take_photo')
def take_photo():
    camera.take_photo()
    return drone.toJSON()

@app.route('/start_recording')
def start_recording():
    camera.start_recording()
    return drone.toJSON()

@app.route('/stop_recording')
def stop_recording():
    camera.stop_recording()
    return drone.toJSON()

@app.route('/get_telemetry')
def get_telemetry():
    if drone.is_connected:
        data = telemetry.get_telemetry_data()
        return jsonify(data)
    else:
        return ""

if __name__ == "__main__":

    # Initialize the drone class
    drone = Drone()

    # Camera for stream, photo, video
    camera = Camera(drone)

    # Udp for sending commands
    udp = UDP()
    udp.receive_response()

    # Handle Tello's state information
    telemetry = Telemetry(drone)
    telemetry.receive_telemetry()

    # Fire up the app
    app.run()
