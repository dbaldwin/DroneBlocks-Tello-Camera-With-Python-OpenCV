import cv2

# Size down the default frame size from 960x720 to 480x360
frame_size = (480, 360)

class VideoCamera(object):
    def __init__(self):
        #self.aruco = Aruco()
        self.cap = cv2.VideoCapture('udp://127.0.0.1:11111')
        _, frame = self.cap.read()
        self.frame = cv2.resize(frame, frame_size)

    def get_frame(self):
        _, frame = self.cap.read()
        frame = cv2.resize(frame, frame_size)

        # The first detected frame is None
        if frame is None:
            ret, jpeg = cv2.imencode('1.jpg', self.frame)
        else:
            ret, jpeg = cv2.imencode('1.jpg', frame)

        return jpeg.tostring()

    def __del__(self):
        self.cap.release()

