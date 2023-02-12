from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

options = webdriver.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--disable-gpu')

service = Service('c:\chromedriver.exe')
browser = webdriver.Chrome(service=service, options=options)
#browser.maximize_window() # 창 최대화

url = "https://flight.naver.com/flights/"

browser.get(url) # url로 이동

#browser.find_element_by_link_text("닫기")
#browser.find_element_by_partial_link_text("닫기")
browser.find_element_by_xpath("//a[text()='닫기']")



# 가는 날 선택 클릭
browser.find_element_by_link_text("가는 날").click()

# 이번달 27일, 28일 선택

browser.find_elements_by_link_text("27")[0].click() # 가는 날짜
browser.find_elements_by_link_text("28")[1].click() # 오는 날짜

browser.find_element_by_xpath("//*[@id='recommendationList']/ul/li[1]/div/dl").click() # 제주도 선택

browser.find_element_by_link_text("항공권 검색").click() # 항공권 검색 클릭

try:
    # 브라우저를 최대 10초까지 기다린다. (xpath의 값이 나올때까지)
    elem = WebDriverWait(browser, 20).until(
    	EC.presence_of_element_located((By.XPATH,"//*[@id='content']/div[2]/div/div[4]/ul/li[1]"))
    )
    print(elem.text)
finally:
    browser.quit()
    

