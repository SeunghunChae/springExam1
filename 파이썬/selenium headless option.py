from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

url = "https://www1.kiwoom.com/h/invest/research/VThemaGroupView"

options = webdriver.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--disable-gpu')

service = Service('c:/chromedriver.exe')
driver = webdriver.Chrome(service=service, options=options)
driver.get(url)

wait = WebDriverWait(driver, 10000)
table = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "table.kwGridHead.tb-kw-grid")))

html = driver.page_source
soup = BeautifulSoup(html, "lxml")

table = soup.find("table", {"class": "kwGridHead tb-kw-grid"})

items = []
for row in table.find_all("tr"):
    data = [cell.text for cell in row.find_all("td")]
    items.append(data)

print(items)

driver.quit()
