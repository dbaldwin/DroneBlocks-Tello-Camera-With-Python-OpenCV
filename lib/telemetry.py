import socket
import threading
import time

class Telemetry(object):

    def __init__(self):
        self.telemetry_sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.telemetry_address = ('', 8890)
        self.telemetry_data = ""


    def receive_telemetry(self):
        self.telemetry_sock.bind(self.telemetry_address)

        def recv():
            while True:
                try:
                    response, _ = self.telemetry_sock.recvfrom(128)
                    response = response.decode(encoding="utf-8")
                    self.telemetry_data = response
                except Exception as e:
                    print("Error receiving: " + str(e))
                    break
                
                time.sleep(5)

        thread = threading.Thread(target=recv)
        thread.start()

    # Telemetry data for Tello looks like this:

    
    # Telemetry data for Tello EDU looks like this:

    def parse_telemetry_data(self):

    def __del__(self):
        self.telemetry_sock.close()