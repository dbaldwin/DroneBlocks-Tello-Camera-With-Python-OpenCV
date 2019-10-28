import cv2
import os
from lib.aruco import Aruco

# Camera class so we can access Tello's camera
class Camera(object):

    # Make sure computer is connected to Tello's Wifi network so we can receive video frames
    # Must send "command" and "streamon" before being able to access the stream
    def __init__(self, detect_aruco_markers):
        self.cap = cv2.VideoCapture('udp://127.0.0.1:11111')
        self.detect_aruco_markers = detect_aruco_markers
        self.frame_size = (480, 360)
        
        if self.detect_aruco_markers is True:
            self.aruco = Aruco()

    # Get the image frame
    def get_frame(self):
        _, frame = self.cap.read()
        frame = cv2.resize(frame, self.frame_size)

        if self.detect_aruco_markers is True:
            frame = self.aruco.detect_markers(frame)

        _, jpeg = cv2.imencode('image.jpg', frame)

        return jpeg.tostring()

    def take_photo(self):
        path = os.getcwd()
        cv2.imwrite(path + "/photos/test.jpg", self.frame)
        return "success"

    def __del__(self):
        self.cap.release()

