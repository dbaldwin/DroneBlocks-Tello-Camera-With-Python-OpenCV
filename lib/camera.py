import cv2
import os
import time
from lib.aruco import Aruco

# Camera class so we can access Tello's camera
class Camera(object):

    # Make sure computer is connected to Tello's Wifi network so we can receive video frames
    # Must send "command" and "streamon" before being able to access the stream
    def __init__(self, drone):
        self.cap = None
        self.drone = drone
        self.frame_size = (480, 360)
        self.video_size = (960, 720)
        self.file_path = os.getcwd()

        # For recording video
        self.vout = cv2.VideoWriter()
        
        if self.drone.is_aruco_tracking_enabled is True:
            self.aruco = Aruco()

    def get_video(self):
        self.drone.is_streaming = True
        self.cap = cv2.VideoCapture('udp://127.0.0.1:11111')
        _, self.frame = self.cap.read()

    # Get the image frame
    def get_frame(self):
        _, self.frame = self.cap.read()

        # Write the video frame before we size it down
        if self.drone.is_recording_video is True:
            self.vout.write(self.frame)

        # Resize the frame for display in the web app
        frame = cv2.resize(self.frame, self.frame_size)

        if self.drone.is_aruco_tracking_enabled is True:
            frame = self.aruco.detect_markers(frame)

        _, jpeg = cv2.imencode('image.jpg', frame)

        return jpeg.tostring()

    def take_photo(self):
        
        try:
            filename = time.strftime("%Y%m%d-%H%M%S")
            cv2.imwrite(self.file_path + "/photos/" + filename + ".jpg", self.frame)
        except Exception as e:
            print("Error taking photo: ", e)
            
        return "success"

    def start_recording(self):
        filename = time.strftime("%Y%m%d-%H%M%S")
        self.vout = cv2.VideoWriter(self.file_path + "/videos/" + filename + ".avi", cv2.VideoWriter_fourcc('M','J','P','G'), 30, self.video_size)
        self.drone.is_recording_video = True

    def stop_recording(self):
        self.vout.release()
        self.drone.is_recording_video = False

    def __del__(self):
        self.vout.release()
        self.cap.release()

