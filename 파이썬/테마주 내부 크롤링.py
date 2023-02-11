from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time


# Setup Chrome driver
options = webdriver.ChromeOptions()
#options.add_argument('--headless')
options.add_argument('--disable-gpu')

driver = webdriver.Chrome(options=options)

#크롤링 시작
url = "https://www1.kiwoom.com/h/invest/research/VThemaGroupView"
driver.get(url)

#1초 기다려야 js를 읽어올 수 있음
time.sleep(1)

'''

#클릭하기
element = driver.find_element_by_xpath('//*[@id="dialog-section-201"]')
driver.execute_script("arguments[0].click();", element)

#1초 기다려야 js를 읽어올 수 있음
time.sleep(1)

#소스 읽어오기
html = driver.page_source
soup = BeautifulSoup(html, "lxml")

#섹션 찾기
section = soup.find("section", {"id": "dialog-section-201"})

#tr 찾기
data = []
for row in section.find_all("tr"):
    cells = [cell.text for cell in row.find_all("td")]
    data.append(cells)

print(data)

driver.quit()
'''
