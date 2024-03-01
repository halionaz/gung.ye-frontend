# <img src="./src/app/favicon.ico" height="22px"> 궁예

> 소소한 미래 예측

## API

### /api/articles
- GET - 모든 Article을 보내줌
- POST - request로부터 받은 데이터를 서버에 추가
- DELETE - request로부터 받은 게시물 ID에 해당하는 게시물 삭제

### /api/answers/[answerID]
- GET - 답변 ID를 받아, 답변 데이터를 보내줌

### /api/answers/byarticle/[articleID]
- GET - 게시물 ID를 받아, 그 게시물에 달린 답변들의 요약과, 세션의 답변 ID를 보내줌

