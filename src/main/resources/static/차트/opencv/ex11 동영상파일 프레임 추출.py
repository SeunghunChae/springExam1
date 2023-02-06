import cv2

capture = cv2.VideoCapture("input.mp4")

count=0

while (capture.isOpened()):
    ret, image=capture.read()
    #read()는 grab()와 retrieve()를 불러옴
    #grab() return false or NULL

    cv2.imwrite('output.jpg' % count, image)

    print("Saved frame%d.jpg" % count)
    count+=1

capture.release()
