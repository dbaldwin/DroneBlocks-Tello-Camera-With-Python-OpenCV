import cv2

class VideoCamera(object):
    def __init__(self):
        self.aruco = Aruco()
        self.cap = cv2.VideoCapture('udp://127.0.0.1:11111')
        #self.frame = cv2.resize(frame, (480, 360))

    def get_frame(self):
        _, frame = self.cap.read()

        # The first detected frame is None
        if frame is None:
            ret, jpeg = cv2.imencode('1.jpg', self.frame)
        else:
            ret, jpeg = cv2.imencode('1.jpg', frame)

        return jpeg.tostring()

    def __del__(self):
        self.cap.release()

