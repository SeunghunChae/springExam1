from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

import requests
import mysql.connector

import time

#db connection dictionary
config={
    'user':'root',
    'password':'cbk0501',
    'host':'3.34.141.19',
    'database':'hackathon',
    'port':'3306'
}

def getConn():
    connection=mysql.connector.connect(**config)
    return connection


def create_table(tName):
    conn=getConn()
    cur=conn.cursor()
    #tsmt='create table ' +tName+' (name varchar(30),price varchar(256),time varchar(256),stock_code varchar(10))'
    tsmt='create table ' +tName+' (tema_name varchar(50),net_change varchar(30),no_stock varchar(20),3days_net_change varchar(30))'

    cur.execute(tsmt)
    conn.commit()
    conn.close()

def insert_a(tName,data):
    conn=getConn()
    cur=conn.cursor()
    tsmt='insert into '+tName+' values(%s, %s, %s, %s)'
    cur.execute(tsmt,data)
    conn.commit()
    conn.close()

def select_a(tName):
    conn=getConn()
    cur=conn.cursor()
    tsmt='select * from '+tName
    cur.execute(tsmt)
    rs=cur.fetchall()
    for i in rs:
        print(i)
    #conn.commit()
    conn.close()



#크롤링 시작
url = "https://www1.kiwoom.com/h/invest/research/VThemaGroupView"

options = webdriver.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--disable-gpu')

service = Service('c:\chromedriver.exe')
driver = webdriver.Chrome(service=service, options=options)
driver.get(url)

#1초 기다려야 js를 읽어올 수 있음
time.sleep(1)

#wait = WebDriverWait(driver, 10)
#table = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "table.kwGridHead.tb-kw-grid")))

html = driver.page_source
soup = BeautifulSoup(html, "lxml")

table = soup.find("table", {"class": "kwGridHead tb-kw-grid"})

#10개만 읽어옴
items = []
i=0
for row in table.find_all("tr"):
    if i<11:
        data = [cell.text for cell in row.find_all("td")]
        items.append(data)
        i+=1
    else :
        break


driver.quit()

print(items)


#크롤링 끝 items는 인덱스가 1번부터 시작함
for i in range(1,11):
    data=(items[i][0],items[i][2],items[i][1],items[i][5])
    insert_a('temascraping', data)
    


