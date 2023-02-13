import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By

browser = webdriver.Chrome("c:/chromedriver.exe") 

# 1. 네이버 이동
browser.get("http://www.naver.com")

# 2. 네이버 로그인 버튼 클릭
elem = browser.find_element(By.CLASS_NAME, 'link_login')
elem.click()

time.sleep(1)
# 3. 아이디, 비밀번호 입력

browser.find_element(By.ID, "id").send_keys("shchae822")
browser.find_element(By.ID, "pw").send_keys("gnslgnsl1#")

# 4. 로그인 버튼 클릭
browser.find_element(By.ID, "log.login").click()

time.sleep(3) # 동시 처리되는 것을 막기 위해 3초를 쉰다.
#browser.close()
