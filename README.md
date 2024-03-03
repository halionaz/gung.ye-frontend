# <img src="./src/app/favicon.ico" height="22px"> 궁예

> 소소한 미래 예측

## API

### Articles

#### /api/articles
- GET - 모든 게시물을 반환
- POST - request로부터 받은 데이터를 서버에 추가
- DELETE - request로부터 받은 게시물 ID에 해당하는 게시물 삭제
- [ ] PUT - request로부터 받은 게시물 ID에 해당하는 게시물 수정

### Answers

#### /api/answers
- POST - request로부터 받은 답변 데이터를 서버에 추가
- DELETE - request로부터 받은 답변 ID에 해당하는 답변 삭제

#### /api/answers/[answerID]
- GET - 답변 ID를 받아, 답변 데이터를 반환
- [ ] PUT - 답변 ID를 받아, 답변 데이터를 수정
- [ ] DELETE - 답변 ID를 받아, 해당 답변을 삭제

#### /api/answers/byarticle/[articleID]
- GET - 게시물 ID를 받아, 그 게시물에 달린 답변들의 요약과, 세션의 답변 ID를 반환
- [ ] DELETE - 게시물 ID를 받아, 그 게시물에 달린 답변들을 일괄 삭제