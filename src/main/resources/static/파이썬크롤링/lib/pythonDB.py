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
    return conn
