from bs4 import BeautifulSoup
import requests
import mysql.connector

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
    tsmt='create table ' +tName+' (name varchar(30),price varchar(256),time varchar(256),stock_code varchar(10))'
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
    
#삼성전자 url
url = 'https://finance.naver.com/item/sise_day.naver?code=005930'
html=requests.get(url, headers={'User-agent' : 'Mozilla/5.0'}).text
bs=BeautifulSoup(html, "lxml")

pgrr = bs.find('td', class_='pgRR')
tdate = bs.find_all('span', class_='gray03')
tdate.reverse()

tprice = bs.find_all('span','tah p11')
price=[]
i=0
for val in tprice:
    if i%5==0:
        price.append(val.text)
    i+=1
price.reverse()

date=[]
for i in tdate:
    date.append(i.text)

strdate=''
strprice=''


for i in range(10):
    if i!=9:
        strdate+=date[i]+'|'
        strprice+=price[i]+'|'
    else:
        strdate+=date[i]
        strprice+=price[i]
print(strdate)
print(strprice)


data=('삼성전자',strprice,strdate,"005930")

#db process

#create_table("dummydata")

insert_a("dummydata",data)
