## API-Document

### 1. 로그인
>POST<br>
> localhost:8080/api/login

- **Request**
```
{
    "userId": "shchae822@naver.com",
    "userPw": "1234"
}
```
- **Response**
```
{
    "resCode": 200,
    "resMsg": "성공",
    "userName": "채승훈",
    "userPk": 1,
    "userId": "shchae822@naver.com"
}
```
---
<br>
<br>

### 2. 로그아웃
> DEL<br>
> localhost:8080/api/logout

- **Request**
```
{ === 없음 === }
```
- **Response**
```
{
    "resCode": 200,
    "resMsg": "성공"
}
```
---
<br>
<br>

### 3. 테마 목록 조회
> GET<br>
> localhost:8080/api/theme

- **Request**
```
{ === 없음 === }
```
- **Response**
```
{
    "themeList": [
        {
            "3daysNetChange": "+7.00%",
            "netChange": "+2.86%",
            "no": 1,
            "mainStockName": "하이스틸, 휴스틸",
            "noStockInc": "5",
            "temaName": "강관",
            "noStock": "6",
            "noStockDesc": "1"
        },
        {
            "3daysNetChange": "+1.50%",
            "netChange": "+1.93%",
            "no": 2,
            "mainStockName": "태광, SNT에너지",
            "noStockInc": "7",
            "temaName": "원자력_기자재",
            "noStock": "7",
            "noStockDesc": ""
        }
    ],
    "resCode": 200,
    "resMsg": "성공"
}

```
---
<br>
<br>

### 4. 테마별 주식 목록 조회
> GET<br>
> localhost:8080/api/stock/{themePk}

- **Request**
```
{ === 없음 === }
```
- **Response**
```
{
    "stockList": [
        {
            "3daysNetChange": "3.35%",
            "netChange": "-1000",
            "no": 1,
            "askPrice": "161,500",
            "temaName": "바이오_바이오시밀러/베터",
            "updownRate": "-0.62%",
            "bidPrice": "161,400",
            "volume": "9,099\t",
            "stockName": "셀트리온",
            "price": "161,400\t",
            "pk": 1,
            "sellingBallance": "1,182",
            "buyBallance": "2,948"
        },
        {
            "3daysNetChange": "29.87%",
            "netChange": "-100",
            "no": 1,
            "askPrice": "173,600",
            "temaName": "바이오_바이오시밀러/베터",
            "updownRate": "+0.06%",
            "bidPrice": "173,200",
            "volume": "142,090",
            "stockName": "메디톡스",
            "price": "173,500",
            "pk": 2,
            "sellingBallance": "13,278\t",
            "buyBallance": "2,653"
        }
    ],
    "resCode": 200,
    "resMsg": "성공"
}
```



### 5. 테마별 상위 4개 종목 - 특정 테마 불러오기
> GET<br>
> localhost:8080/api/theme/top4/{themePk}

- **Request**
```
{ === 없음 === }
```
- **Response**
```
{
    "top4List": [
                    {
                        "stockName": "영준차",
                        "stockPk": 4,
                        "stockUpAndDown": 5.3,
                        "stockPrice": 25000,
                        "stockCode": "000001"
                    },
                    {
                        "stockName": "승훈차",
                        "stockPk": 3,
                        "stockUpAndDown": 2.4,
                        "stockPrice": 25000,
                        "stockCode": "000001"
                    }
                 ],
    "resCode": 200,
    "resMsg": "성공"
}

```

---
<br>
<br>

### 6. 테마별 상위 4개 종목 - 전체 테마 불러오기
> GET<br>
> localhost:8080/api/theme/top4/all

- **Request**
```
{ === 없음 === }
```
- **Response**
```
{
    "top4List": [
        {
            "3daysNetChange": "29.87%",
            "netChange": "-100",
            "no": 1,
            "askPrice": "173,600",
            "temaName": "바이오_바이오시밀러/베터",
            "updownRate": "+0.06%",
            "bidPrice": "173,200",
            "volume": "142,090",
            "stockName": "메디톡스",
            "price": "173,500",
            "pk": 2,
            "sellingBallance": "13,278\t",
            "buyBallance": "2,653"
        },
        {
            "3daysNetChange": "3.35%",
            "netChange": "-1000",
            "no": 1,
            "askPrice": "161,500",
            "temaName": "바이오_바이오시밀러/베터",
            "updownRate": "-0.62%",
            "bidPrice": "161,400",
            "volume": "9,099\t",
            "stockName": "셀트리온",
            "price": "161,400\t",
            "pk": 1,
            "sellingBallance": "1,182",
            "buyBallance": "2,948"
        }
    ],
    "resCode": 200,
    "resMsg": "성공"
}
```

### 7. 크롤링 테이블 전체 조회
> GET<br>
> localhost:8080/api/crawling

- **Request**
```
{ === 없음 === }
```
- **Response**
```
{
    "crawlingList": [
        {
            "date": "2021.03.22|2021.03.22|2021.03.22|2021.03.22|2021.03.22|2021.03.22|2021.03.22|2021.03.22|2021.03.22|2021.03.22|",
            "code": "00590",
            "price": "62800|62800|62800|62800|62800|62800|62800|62800|62800|62800|62800|62800"
        }
    ],
    "resCode": 200,
    "resMsg": "성공"
}
```
