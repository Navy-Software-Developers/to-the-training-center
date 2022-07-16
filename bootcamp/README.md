# REST API

`env.py`에 공공데이터포털에서 발급받은 서비스키를 설정해야합니다.

## Install

    pip install -r requirements.txt

## Run the app

    python .\manage.py runserver <ip>:<port>

# REST API

REST API는 아래 기술되어있습니다.

## 병과 목록 가져오기

### Request

`GET /api/mos`

### Response

    [
        {
            "pk": 196,
            "code": "56",
            "name": "SW개발병",
            "branch": 2
        },
        {
            "pk": 1,
            "code": "412.101",
            "name": "전문간호",
            "branch": 1
        },
        {
            "pk": 2,
            "code": "461.101",
            "name": "법무행정",
            "branch": 1
        }
    ]

## 특정 병과 세부정보 가져오기

### Request

`GET /api/mos/:id`

### Response

    {
        "code": "56",
        "name": "SW개발병",
        "branch": 2,
        "wiki": "해군  소프트웨어개발병입니다. 소프트웨어를 개발합니다.",
        "wiki_modified_date": "2022-07-13T14:09:07.304269Z",
        "recurits": [
            {
                "id": 754,
                "mos": 196,
                "recuritYear": 2022,
                "recuritRound": 7,
                "enlistMilitaryUnit": "해군교육사령부",
                "recuritCnt": 2,
                "applyedCnt": 6,
                "recuritStart": 20220629,
                "recuritEnd": 20220706,
                "enlistStart": 202210,
                "enlistEnd": 202210
            },
            {
                "id": 755,
                "mos": 196,
                "recuritYear": 2022,
                "recuritRound": 5,
                "enlistMilitaryUnit": "해군교육사령부",
                "recuritCnt": 1,
                "applyedCnt": 8,
                "recuritStart": 20220427,
                "recuritEnd": 20220504,
                "enlistStart": 202208,
                "enlistEnd": 202208
            }
        ]
    }

## 특정 병과 위키 문서 역사 가져오기

### Request

`GET /api/mos/:id/wiki`

### Response

    [
        {
            "content": "해군  소프트웨어개발병입니다. 소프트웨어를 개발합니다.",
            "modifier": 9,
            "modified": "2022-07-13T14:09:07.304269Z"
        },
        {
            "content": "해군  소프트웨어개발병입니다.",
            "modifier": 9,
            "modified": "2022-07-13T11:01:01.301111Z"
        }
    ]

## 특정 병과 위키 문서 수정하기

### Request

`POST /api/mos/:id/wiki`

|인자|타입|설명|
|----|---|---|
|content|String|본문 내용|

### Response

    {'status': 'success'}

## 로그인한 유저의 병과 관심 목록 조회하기

### Request

`GET /api/mos/likes`

### Response

    [
        {
            "user": 9,
            "mos": 196,
            "notification": true
        },
        {
            "user": 9,
            "mos": 318,
            "notification": true
        }
    ]

## 특정 병과 관심에 추가

### Request

`POST /api/mos/:id/like`

### Response

    {'status': 'success'}

## 특정 병과 관심 알림 상태 변경하기

### Request

`PUT /api/mos/:id/like`

|인자|타입|설명|
|----|---|---|
|notification|Boolean|알림 여부|

### Response

    {'status': 'success'}

## 특정 병과 관심 삭제하기

### Request

`DELETE /api/mos/:id/like`

### Response

    {'status': 'success'}

