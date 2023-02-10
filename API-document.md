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
                        "themeName": "자동차",
                        "themeUpAndDown": 4.5,
                        "themePk": 1
                    },
                    {
                        "themeName": "반도체",
                        "themeUpAndDown": -12.1,
                        "themePk": 2
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
            "stockName": "현대차",
            "stockPk": 1,
            "stockUpAndDown": -0.9,
            "stockPrice": 164500,
            "stockCode": "005380"
        },
        {
            "stockName": "기아차",
            "stockPk": 2,
            "stockUpAndDown": 1.2,
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
    "themeList": [
                    {
                        "themeName": "자동차",
                        "themeUpAndDown": 4.5,
                        "themePk": 1
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
                     },
                  ],
    "resCode": 200,
    "resMsg": "성공"
}
```


### 7. 최근 10일 주가 조회
> GET<br>
> localhost:8080/api/analysis/{stockPK}

- **Request**
```
{ === 없음 === }
```
- **Response**
```
{
    "resCode": 200,
    "resMsg": "성공",
    "stock10Days": [
        {
            "date": "23.01.30|23.01.31|23.02.01|23.02.02|23.02.03|23.02.06|23.02.07|23.02.08|23.02.09|23.02.10",
            "stockName": "현대차",
            "stockPk": 1,
            "stockHistory": "174400|169900|169200|171500|170100|174000|171000|171500|171900|171600",
            "stockCode": "005380"
        }
    ]
}
```
