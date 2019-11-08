import socket
import threading
import time
from lib import drone

class Telemetry(object):

    def __init__(self, drone):
        self.telemetry_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.telemetry_address = ('', 8890)
        self.telemetry_data = ""
        self.drone = drone

        # Tello telemetry format
        # pitch:0;roll:0;yaw:0;vgx:0;vgy:0;vgz:-3;templ:67;temph:70;tof:10;h:0;bat:66;baro:354.75;time:0;agx:-3.00;agy:-8.00;agz:-1018.00;
        self.tello_telemetry_indices = {
            "pitch": 0,
            "roll": 1,
            "yaw": 2,
            "tof": 8,
            "altitude": 9,
            "battery": 10
        }

        # Tello EDU telemetry format
        # mid:-1;x:0;y:0;z:0;mpry:0,0,0;pitch:1;roll:0;yaw:0;vgx:0;vgy:0;vgz:0;templ:66;temph:67;tof:10;h:0;bat:88;baro:328.69;time:0;agx:21.00;agy:15.00;agz:-1004.00;
        self.tello_edu_telemetry_indices = {
            "pitch": 5,
            "roll": 6,
            "yaw": 7,
            "tof": 13,
            "altitude": 14,
            "battery": 15
        }


    def receive_telemetry(self):
        self.telemetry_sock.bind(self.telemetry_address)

        def recv():
            while True:
                try:
                    response, _ = self.telemetry_sock.recvfrom(256)
                    response = response.decode(encoding="utf-8")
                    self.parse_telemetry(response)                
                except Exception as e:
                    print("Error receiving: " + str(e))
                    break

        thread = threading.Thread(target=recv)
        thread.start()

    def get_telemetry_data(self):
        return self.telemetry_data

    
    def parse_telemetry(self, data):
        data = data.split(";")
        self.drone.pitch = data[self.tello_telemetry_indices["pitch"]].split(":")[1]
        self.drone.roll = data[self.tello_telemetry_indices["roll"]].split(":")[1]
        self.drone.yaw = data[self.tello_telemetry_indices["yaw"]].split(":")[1]
        self.drone.tof = data[self.tello_telemetry_indices["tof"]].split(":")[1]
        self.drone.altitude = data[self.tello_telemetry_indices["altitude"]].split(":")[1]
        self.drone.battery = data[self.tello_telemetry_indices["battery"]].split(":")[1]


    def __del__(self):
        self.telemetry_sock.close()