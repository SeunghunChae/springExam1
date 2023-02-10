from bs4 import BeautifulSoup
import requests

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
