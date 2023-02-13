from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup

import json

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
    tsmt='create table ' +tName+' (no_pk int not null auto_increment primary key,no int, tema_name varchar(50), stock_name varchar(50), price varchar(20)'+\
          ',net_change varchar(20),  updown_rate varchar(20), volume varchar(20), ask_price varchar(20), selling_ballance varchar(20)'+\
          ',bid_price varchar(20), buy_ballance varchar(20), 3days_net_change varchar(20))'

    cur.execute(tsmt)
    conn.commit()
    conn.close()

def insert_a(tName,data):
    conn=getConn()
    cur=conn.cursor()
    tsmt='insert into '+tName+'(no, tema_name , stock_name , price , net_change , updown_rate , volume , ask_price , selling_ballance , bid_price , buy_ballance , 3days_net_change) values(%s, %s, %s, %s, %s,%s,%s,%s,%s,%s,%s,%s)'
    cur.execute(tsmt,data)
    conn.commit()
    conn.close()

def select_a(tName,no):
    data=[]
    
    conn=getConn()
    cur=conn.cursor()
    tsmt='select * from '+tName+' where no='+no+' order BY no_pk asc'
    #print(tsmt)
    cur.execute(tsmt)
    rs=cur.fetchall()
    for i in rs:
        #print(i)
        data.append(list(i))
    #conn.commit()
    conn.close()

    return data

def select_b():
    data=[]
    
    conn=getConn()
    cur=conn.cursor()
    tsmt='SELECT DISTINCT NO,tema_name FROM stockintema '
    #print(tsmt)
    cur.execute(tsmt)
    rs=cur.fetchall()
    for i in rs:
        #print(i)
        data.append(list(i))
    #conn.commit()
    conn.close()

    return data

def select_c(no):
    data=[]
    
    conn=getConn()
    cur=conn.cursor()
    tsmt='SELECT DISTINCT NO,tema_name FROM stockintema '
    #print(tsmt)
    cur.execute(tsmt)
    rs=cur.fetchall()
    for i in rs:
        #print(i)
        data.append(list(i))
    #conn.commit()
    conn.close()

    return data

def delete_table(tName):
    conn=getConn()
    cur=conn.cursor()
    tsmt='DELETE FROM ' +tName
    cur.execute(tsmt)
    conn.commit()
    conn.close()


#테마 가져오기
temp=select_a('stockintema','3')

meta_tema=select_b()
print(meta_tema)    

url = "https://finance.naver.com/"

options = webdriver.ChromeOptions()
#options.add_argument('--headless')
options.add_argument('--disable-gpu')

service = Service('c:\chromedriver.exe')
driver = webdriver.Chrome(service=service, options=options)
driver.get(url)


with open('C:/Users/KOSCOM/Downloads/firstProject/firstProject/springExam1/파이썬(크롤링, lstm 소스)/파이썬크롤링/stockJSON.json', 'r', encoding='UTF-8') as f:
    json_data = json.load(f)
print(json_data)

'''
for i in range(len(meta_tema)):
    tlist=select_a('stockintema',str(i))
    print(tlist)

'''

#크롤링으로 종목코드 찾기 

for i in range(len(meta_tema)):
    print(i)
    #1초 기다려야 js를 읽어올 수 있음
    time.sleep(0.5)

    #i번재 테마의 증권 리스트
    tlist=select_a('stockintema',str(i))
    print(str(i)+'번째 리스트 :')
    for k in tlist :
        print(k)
    
    for j in tlist:
        driver.find_element(By.ID, 'stock_items').clear()
        driver.find_element(By.ID, 'stock_items').send_keys(j[3])

        time.sleep(0.5)

        #html 가져오기
        html = driver.page_source
        soup = BeautifulSoup(html, "lxml")

        span = soup.find_all("span", {"class": "num _au_real_list"})
        #print(span[0].text)
        j.append(span[0].text)
        print(j,'\n')

