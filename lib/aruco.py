import cv2
import numpy as np
from cv2 import aruco

class Aruco(object):

    # Initialize ArUco
    def __init__(self):
        self.aruco_dict = aruco.Dictionary_get(aruco.DICT_ARUCO_ORIGINAL)
        self.parameters =  aruco.DetectorParameters_create()

    # Do ArUco marker detection
    def detect_markers(self, frame):
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        corners, ids, _ = aruco.detectMarkers(gray, self.aruco_dict, parameters=self.parameters)
        markers = aruco.drawDetectedMarkers(frame, corners, ids)
        return markers