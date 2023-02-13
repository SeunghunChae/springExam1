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



#create_table('stockintema')

#delete_table('temascraping')
#create_table('stockintema')



#크롤링 시작
url = "https://www1.kiwoom.com/h/invest/research/VThemaGroupView"

options = webdriver.ChromeOptions()
#options.add_argument('--headless')
options.add_argument('--disable-gpu')

service = Service('c:\chromedriver.exe')
driver = webdriver.Chrome(service=service, options=options)
driver.get(url)

#1초 기다려야 js를 읽어올 수 있음
time.sleep(0.5)

#driver을 최대 10초까지 기다림
#wait = WebDriverWait(driver, 10)
#css셀렉터를 통해 table.kwGridHead.tb-kw-grid이 나올때까지 기다림
#table = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, "table.kwGridHead.tb-kw-grid")))

html = driver.page_source
soup = BeautifulSoup(html, "lxml")

table = soup.find("table", {"class": "kwGridHead tb-kw-grid"})



no_tema=7


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
    if i>no_tema:
        break

#print(data)
del data[0]
name=[]
for i in data:
    #print(i[0],'\n')
    name.append(i[0])
#name에 테마 이름 가져옴
#print(name,'\n')




data=[]
print(len(name))
print(name)
for i in range(len(name)):
    tdata=[]
    #n번 크롤링 다시 함
    url = "https://www1.kiwoom.com/h/invest/research/VThemaGroupView"

    options = webdriver.ChromeOptions()
    #options.add_argument('--headless')
    options.add_argument('--disable-gpu')

    service = Service('c:\chromedriver.exe')
    driver = webdriver.Chrome(service=service, options=options)
    driver.get(url)

    time.sleep(0.5)   
    
    #테마 내용 클릭
    driver.find_element(By.LINK_TEXT, name[i]).click()


    #클릭 후 기다림
    time.sleep(0.5)

    #클릭한 후 html 다시 읽어옴
    html = driver.page_source
    soup = BeautifulSoup(html, "lxml")


    div = soup.find("div", {"class": "table-body"})
    table=div.find("table")


    for row in table.find_all("tr"):
        rowdata=[]
        rowdata.append(i)
        rowdata.append(name[i])
        for cell in row.find_all("td"):
            #print(cell.text)
            if str(cell.contents[0]).find("rate-increase") !=-1 :
                #print(cell.contents[0])
                rowdata.append("+"+cell.text)
            elif str(cell.contents[0]).find("rate-decrease") !=-1:
                #print(cell.contents[0])
                rowdata.append("-"+cell.text)
            else:
                rowdata.append(cell.text)
        #print("\n")
        
        tdata.append(rowdata)
    
    del tdata[0]
    for j in tdata:
        data.append(j)
    
    #btn-close, dialog-close-201
    #닫기버튼이 안눌린다 젠장 노가다 하기로 함
    driver.quit()

#kwGridTablePop > div > div.table-body > table > tbody > tr:nth-child(1) > td.al-l > a
#print(driver.find_element(By.CSS_SELECTOR, "#kwGridTablePop > div > div.table-body > table > tbody > tr:nth-child(1) > td.al-l > a").text)

#time.sleep(3)
#driver.quit()

#driver.quit()


for i in data:
    print(i,'\n')


delete_table('stockintema')

#크롤링 끝 items는 인덱스가 1번부터 시작함
for i in range(len(data)):
    #stock_inc와 desc는 부호제거
    rowdata=(data[i][0], data[i][1],data[i][2],data[i][3],data[i][4],data[i][5],data[i][6],data[i][7],data[i][8],data[i][9],data[i][10],data[i][11])
    insert_a('stockintema', rowdata)



