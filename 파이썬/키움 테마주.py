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

url = 'https://www1.kiwoom.com/h/invest/research/VThemaGroupView'
html=requests.get(url, headers={'User-agent' : 'Mozilla/5.0'}).text
bs=BeautifulSoup(html, "lxml")

inner = bs.find_all('div',class_='inner-contents')
tr = bs.find_all('tr')

print(inner)


#data=(stockname,strprice,strdate,code)

#db process

#create_table("dummydata")

#insert_a("dummydata",data)

#create_table("temaScraping")
