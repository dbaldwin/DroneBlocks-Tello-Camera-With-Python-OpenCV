import cv2
import os
import time
from lib.aruco import Aruco

# Camera class so we can access Tello's camera
class Camera(object):

    # Make sure computer is connected to Tello's Wifi network so we can receive video frames
    # Must send "command" and "streamon" before being able to access the stream
    def __init__(self, detect_aruco_markers):
        self.cap = None
        self.detect_aruco_markers = detect_aruco_markers
        self.frame_size = (480, 360)

        # For recording video
        self.vout = cv2.VideoWriter()
        
        if self.detect_aruco_markers is True:
            self.aruco = Aruco()

    def get_video(self):
        self.cap = cv2.VideoCapture('udp://127.0.0.1:11111')
        _, self.frame = self.cap.read()

    # Get the image frame
    def get_frame(self):
        _, self.frame = self.cap.read()
        frame = cv2.resize(self.frame, self.frame_size)

        if self.detect_aruco_markers is True:
            frame = self.aruco.detect_markers(frame)

        _, jpeg = cv2.imencode('image.jpg', frame)

        return jpeg.tostring()

    def take_photo(self):
        path = os.getcwd()
        filename = time.strftime("%Y%m%d-%H%M%S")
        cv2.imwrite(path + "/photos/" + filename + ".jpg", self.frame)
        return "success"

    def record_video(self):
        fourcc = cv2.cv.CV_FOURCC('m', 'p', '4', 'v')

    def __del__(self):
        self.cap.release()

