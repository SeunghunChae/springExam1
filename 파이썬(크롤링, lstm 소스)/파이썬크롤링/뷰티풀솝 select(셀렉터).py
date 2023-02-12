import requests
from bs4 import BeautifulSoup

url = "https://www1.kiwoom.com/h/invest/research/VThemaGroupView"
res = requests.get(url)
soup = BeautifulSoup(res.text, "html.parser")

top_stocks = soup.select("table.d2_t1_t tr")[:10]
for stock in top_stocks:
    ticker = stock.select_one("td:nth-of-type(1) a").text.strip()
    price = stock.select_one("td:nth-of-type(2)").text.strip()
    change = stock.select_one("td:nth-of-type(3)").text.strip()
    print(f"Ticker: {ticker} - Price: {price} - Change: {change}")

