import cv2
from lib.aruco import Aruco

# Size down the default frame size from 960x720 to 480x360
frame_size = (480, 360)

# Set to true if doing ArUco detection
# Set to false to get camera stream with no detection enabled
detect_aruco_markers = True

# Camera class so we can access Tello's camera
class Camera(object):

    # Make sure computer is connected to Tello's Wifi network so we can receive video frames
    # Must send "command" and "streamon" before being able to access the stream
    def __init__(self):
        self.cap = cv2.VideoCapture('udp://127.0.0.1:11111')
        
        if detect_aruco_markers is True:
            self.aruco = Aruco()

    # Get the image frame
    def get_frame(self):
        _, frame = self.cap.read()
        frame = cv2.resize(frame, frame_size)

        if detect_aruco_markers is True:
            frame = self.aruco.detect_markers(frame)

        _, jpeg = cv2.imencode('1.jpg', frame)

        return jpeg.tostring()

    def __del__(self):
        self.cap.release()

