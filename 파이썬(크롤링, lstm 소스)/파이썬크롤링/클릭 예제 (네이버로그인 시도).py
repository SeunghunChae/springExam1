import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

browser = webdriver.Chrome("c:/chromedriver.exe") 

# 1. 네이버 이동
browser.get("http://www.naver.com")

# 2. 네이버 로그인 버튼 클릭
elem = browser.find_element_by_class_name("link_login")
elem.click()

# 3. 아이디, 비밀번호 입력

browser.find_element_by_id("id").send_keys("id")
browser.find_element_by_id("pw").send_keys("password")

# 4. 로그인 버튼 클릭
browser.find_element_by_id("log.login").click()

time.sleep(3) # 동시 처리되는 것을 막기 위해 3초를 쉰다.
