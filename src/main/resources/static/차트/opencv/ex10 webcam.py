import cv2

capture = cv2.VideoCapture(0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 720)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while True:

    ret, frame = capture.read()
    cv2.imshow("videoFrame", frame)

    if cv2.waitKey(1)>0: break
    #1ms마다 프레임을 재생, 키입력시 종료 argument는 정

capture.release()
cv2.destroyAllWindows()
