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
    
    def parse_telemetry(self, data):

        data = data.split(";")

        # Detect if Tello (1) or Tello EDU (2)
        if self.drone.type is None:
            # Tello EDU contains mid
            if("mid" in data[0]):
                self.drone.type = 2

        
        if self.drone.type == 2:
            pitch_index = self.tello_edu_telemetry_indices["pitch"]
            roll_index = self.tello_edu_telemetry_indices["roll"]
            yaw_index = self.tello_edu_telemetry_indices["yaw"]
            tof_index = self.tello_edu_telemetry_indices["tof"]
            altitude_index = self.tello_edu_telemetry_indices["altitude"]
            battery_index = self.tello_edu_telemetry_indices["battery"]
        else: 
            pitch_index = self.tello_telemetry_indices["pitch"]
            roll_index = self.tello_telemetry_indices["roll"]
            yaw_index = self.tello_telemetry_indices["yaw"]
            tof_index = self.tello_telemetry_indices["tof"]
            altitude_index = self.tello_telemetry_indices["altitude"]
            battery_index = self.tello_telemetry_indices["battery"]

        self.drone.pitch = data[pitch_index].split(":")[1]
        self.drone.roll = data[roll_index].split(":")[1]
        self.drone.yaw = data[yaw_index].split(":")[1]
        self.drone.tof = data[tof_index].split(":")[1]
        self.drone.altitude = data[altitude_index].split(":")[1]
        self.drone.battery = data[battery_index].split(":")[1]

    def __del__(self):
        self.telemetry_sock.close()