# <img src="./public/favicon.ico" height="22px"> 궁예

> 소소한 미래 예측

## 주요 용어

- 신탁 (Article) :: 미래에 대한 질문을 담은 게시글
- 답변 (Answer) :: 신탁에 대한 사용자들의 대답 (Yes / No)
- 궁예지수 :: gung:ye 내에서 활용되는 점수이자 재화
- 관심법지수 :: 신탁 답변에 대한 정답률

## DATA Object

```js
// articles
{
    id: string,
    title: string,
    text: string,
    writer: string,
    postingDate: TimeStamp,
    imgsrc: string,
    deadline: TimeStamp,
    openDate: TimeStamp
}

// answers
{
    id: string,
    article: string,
    answerVal: string,
    respondent: string,
    cost: int,
    postingDate: TimeStamp
}

// users
{
    id: string,
    point: int,
    profileImg: string
}

// likes
{
    id: string,
    article: string,
    userID: string
}

```

## API

### Articles

#### /api/articles

- GET - 모든 신탁을 반환
- POST - request로부터 받은 데이터를 신탁 DB에 추가
- DELETE - request로부터 받은 신탁 ID에 해당하는 신탁 삭제
- [ ] PUT - request로부터 받은 신탁 ID에 해당하는 신탁 수정

#### /api/articles/[articleID]

- [ ] GET - 신탁 ID를 받아, 신탁 데이터를 반환

### Answers

#### /api/answers

- POST - request로부터 받은 답변 데이터를 답변 DB에 추가
- [ ] PUT - request로부터 답변 ID를 받아, 답변 데이터를 수정
- DELETE - request로부터 받은 답변 ID에 해당하는 답변 삭제

#### /api/answers/[answerID]

- GET - 답변 ID를 받아, 답변 데이터를 반환

#### /api/answers/byarticle/[articleID]

- [ ] GET - 신탁 ID를 받아, 그 신탁에 달린 답변들의 요약(각 항목 별 답변 수, 총 판 돈)과, 세션의 답변 ID를 반환
- [ ] DELETE - 신탁 ID를 받아, 그 신탁에 달린 답변들을 일괄 삭제 (만료일이 되기 전에 작성자만 가능하도록!)

## 기술 스택
- Next.js :: 메인 프레임워크
- Next-auth :: 계정 구현 담당
- Firebase :: 현재 임시 DB, 제대로 된 DB 구현 예정