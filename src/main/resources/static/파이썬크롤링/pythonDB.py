import mysql.connector

#db connection dictionary
config={
    'user':'root',
    'password':'gnslgnsl1#',
    'host':'127.0.0.1',
    'database':'pydb',
    'port':'3307'
}

def getConn():
    connection=mysql.connector.connect(**config)
    return connection


def create_table(tName):
    conn=getConn()
    cur=conn.cursor()
    tsmt='create table ' +tName+' (name varchar(20),price int)'
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

#create_table('koscom')
#insert_a('koscom')

select_a('koscom')
