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
    tsmt='create table ' +tName+' (no int, tema_name varchar(50), stock_name varchar(50), price varchar(20)'+\
          ',net_change varchar(20),  updown_rate varchar(20), volume varchar(20), ask_price varchar(20), selling_ballance varchar(20)'+\
          ',bid_price varchar(20), buy_ballance varchar(20), 3days_net_change varchar(20))'

    cur.execute(tsmt)
    conn.commit()
    conn.close()

def insert_a(tName,data):
    conn=getConn()
    cur=conn.cursor()
    tsmt='insert into '+tName+' values(%s, %s, %s, %s, %s,%s,%s,%s)'
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

def delete_table(tName):
    conn=getConn()
    cur=conn.cursor()
    tsmt='DELETE FROM ' +tName
    cur.execute(tsmt)
    conn.commit()
    conn.close()

while(1):
    time.sleep(3)
    print("시작")

    #create_table('stockintema')



    #create_table('temascraping')

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

    #driver을 최대 10초까지 기다림
    #wait = WebDriverWait(driver, 10)
    #css셀렉터를 통해 table.kwGridHead.tb-kw-grid이 나올때까지 기다림
    #table = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "table.kwGridHead.tb-kw-grid")))

    html = driver.page_source
    soup = BeautifulSoup(html, "lxml")

    table = soup.find("table", {"class": "kwGridHead tb-kw-grid"})

    #10개만 읽어옴
    i=0

    data=[]
    for row in table.find_all("tr"):
        #print("row.find_all(td)")
        #print(row.find_all("td"))
        #각 행마다
        rowdata=[]
        for cell in row.find_all("td"):
            if str(cell.contents[0]).find("rate-increase") !=-1 :
                #print(cell.contents[0])
                rowdata.append("+"+cell.text)
            elif str(cell.contents[0]).find("rate-decrease") !=-1:
                #print(cell.contents[0])
                rowdata.append("-"+cell.text)
            else:
                rowdata.append(cell.text)
        i+=1
        data.append(rowdata)
        if i==31:
            break


    driver.quit()


    delete_table('temascraping')

    #크롤링 끝 items는 인덱스가 1번부터 시작함
    for i in range(1,len(data)):
        #stock_inc와 desc는 부호제거
        rowdata=(i,data[i][0],data[i][2],data[i][1],data[i][5],data[i][3][1:],data[i][4][1:],data[i][6])
        insert_a('temascraping', rowdata)




