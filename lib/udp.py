import socket
import threading

class UDP(object):

    def __init__(self):
        self.tello_response = None
        self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        self.local_address = ('', 9000)
        #self.tello_address = ('', 8889)
        self.tello_address = ('192.168.10.1', 8889)

    def send_command(self, command):

        try:
            print("Sending command: ", command.encode())
            self.sock.sendto(command.encode(), self.tello_address)
        except Exception as e:
            print ("Error sending: " + str(e))

        return self.tello_response

    def start_listening(self):
        self.sock.bind(self.local_address)

        def recv():
            while True:
                try:
                    self.tello_response, _ = self.sock.recvfrom(128)
                    self.tello_response = self.tello_response.decode(encoding="utf-8")
                    print("udp receive got a response: " + self.tello_response)
                except Exception as e:
                    self.tello_response = None
                    print("Error receiving: " + str(e))
                    break

        receive_thread = threading.Thread(target=recv)
        receive_thread.setDaemon(True)
        receive_thread.start()

    # Loop and wait for a response
    def get_response(self):

        while True:
            if self.tello_response is not None:
                response = self.tello_response
                self.tello_response = None
                return response

    def clear_response(self):
        self.tello_response = None


    def __del__(self):
        self.sock.close()
