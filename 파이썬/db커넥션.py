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
    tsmt='create table ' +tName+' (name varchar(20),time_price varchar(200))'
    cur.execute(tsmt)
    conn.commit()
    conn.close()

def insert_a(tName):
    conn=getConn()
    cur=conn.cursor()
    tsmt='insert into '+tName+' values(%s, %s)'
    cur.execute(tsmt,('삼성전자','10000'))
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


#conn=getConn
create_table('samsung')
#insert_a('koscom')

#select_a('koscom')
