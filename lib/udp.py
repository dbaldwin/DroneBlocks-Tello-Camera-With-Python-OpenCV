import socket
import threading

class UDP(object):

    def __init__(self):
        self.tello_response = ""
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)

    def receive(self):
        local_address = ('', 9000)
        self.sock.bind(local_address)

        def recv():
            while True:
                try:
                    self.tello_response, _ = self.sock.recvfrom(128)
                    self.tello_response = self.tello_response.decode(encoding="utf-8")
                    print(self.tello_response)
                except Exception as e:
                    print("Error receiving: " + str(e))
                    break

        recvThread = threading.Thread(target=recv)
        recvThread.start()

    def __del__(self):
        self.sock.close()
