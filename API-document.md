## API-Document

### 1. 로그인
>POST<br>
> localhost:8080/api/login

- **Requset**
```
{ === 없음 === }
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
    "buyDetailList": [
        {
            "stockName": "현대차",
            "stockTime": "2023-01-18",
            "stockPk": 1,
            "stockUpAndDown": -0.9,
            "stockPrice": 164500,
            "stockCode": "005380"
        }
    ]
}
```
---
<br>
<br>

### 2. 로그아웃
> DEL<br>
> localhost:8080/api/logout

- **Requset**
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

- **Requset**
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

### 4. 테마별 상위 4개 종목
> GET<br>
> localhost:8080/api/theme/top4/{themePk}

- **Requset**
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

