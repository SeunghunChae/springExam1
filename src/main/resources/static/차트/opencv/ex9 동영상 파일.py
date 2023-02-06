import cv2

capture = cv2.VideoCapture("input.mp4")


while True:
    if(capture.get(cv2.CAP_PROP_POS_FRAMES)==capture.get(cv2.CAP_PROP_FRAME_COUNT)):
        capture.open("input.mp4")

    #cv2.CAP_PROP_POS_FRAMES 현재 frame
    #cv2.CAP_PROP_FRAME_COUNT 총 frame
    #같을경우 마지막프레임이므로 다시 동영상을 불러옴

    ret, frame = capture.read()
    cv2.imshow("videoFrame", frame)

    if cv2.waitKey(33)>0: break
    #33ms마다 프레임을 재생, 키입력시 종료

capture.release()
cv2.destroyAllWindows()
