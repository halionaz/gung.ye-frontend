// Main에 올라가는 신탁 컴포넌트

import style from "./Article.module.css";
import { useEffect, useState } from "react";

const Article = ({
    id,
    title,
    imgsrc,
    text,
    outdate,
    writer,
    postingDate,
    openDate,
    session,
    refreshData,
}) => {
    const outdateDate = new Date(outdate);
    const postingDateDate = new Date(postingDate);
    const openDateDate = new Date(openDate);

    const [answerData, setAnswerData] = useState({});
    const [myAnswer, setMyAnswer] = useState(undefined);

    const refreshArticleData = () => {
        fetch(`/api/answers/byarticle/${id}`, {
            cache: "no-store",
        }).then((data) => {
            setAnswerData(data.data);
            setMyAnswer(data.yourResponse);
        });
    };

    const getProfile = () => {
        // 작성자 정보 가지고 옴
    };

    const deleteArticle = () => {
        // 아티클을 지움
        fetch(`api/articles`, {
            method: "DELETE",
            body: JSON.stringify({
                id,
            }),
        }).then(() => {
            refreshData();
        });
    };
    const deleteAnswer = () => {
        // 내 답변을 지움
        fetch(`api/answers`, {
            method: "DELETE",
            body: JSON.stringify({
                id: myAnswer,
            }),
        }).then(() => {
            refreshArticleData();
        });
    };

    useEffect(() => {
        // article 컴포넌트가 업데이트 될 때
        // 이 article에 답변된 answer 데이터 가져오기
        refreshArticleData();
    }, []);

    return (
        <div className={style.article}>
            <div className={style.top}>
                {imgsrc && (
                    <div className={style.imgBox}>
                        <img className={style.articleImg} src={imgsrc}></img>
                    </div>
                )}
                <div className={style.contentOutline}>
                    <div className={style.title}>{title}</div>
                    <div className={style.postingDate}>
                        {postingDateDate.toLocaleDateString()}
                    </div>
                    <div className={style.topProfile}>
                        <div className={style.profileImgBox}>
                            <img
                                className={style.profileImg}
                                src="https://avatars.githubusercontent.com/u/58812281?v=4"
                            ></img>
                        </div>
                        <div className={style.profile}>
                            <div className={style.upperProfile}>
                                <div className={style.nickname}>{writer}</div>
                            </div>
                            <div className={style.lowerProfile}>
                                <div className={style.gungyePoint}>368</div>
                                <div className={style.profileBadge}>멋진거</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.main}>
                <div className={style.contents}>
                    <div className={style.detailContents}>
                        <div className={style.text}>{text}</div>
                    </div>
                </div>
                <div className={style.poll}>
                    {session?.user.email !== writer &&
                        // 다른 사람의 신탁인 경우
                        (myAnswer ? (
                            // 답변을 남긴 경우
                            <div className={style.stat}>
                                다른 사람들 통계 표시
                            </div>
                        ) : (
                            // 답변을 남기지 않은 경우
                            <div className={style.leftPoll}>
                                <div
                                    className={style.answerBtn}
                                    onClick={() => {
                                        fetch(`api/answers`, {
                                            method: "POST",
                                            body: JSON.stringify({
                                                answerVal: "yes",
                                                article: id,
                                            }),
                                        }).then(() => {
                                            refreshArticleData();
                                        });
                                    }}
                                >
                                    <img
                                        className={style.answerIcon}
                                        src="/yes.svg"
                                    />
                                    <div className={style.yesBtn}>YES</div>
                                </div>
                                <div
                                    className={style.answerBtn}
                                    onClick={() => {
                                        fetch(`api/answers`, {
                                            method: "POST",
                                            body: JSON.stringify({
                                                answerVal: "no",
                                                article: id,
                                            }),
                                        }).then(() => {
                                            refreshArticleData();
                                        });
                                    }}
                                >
                                    <img
                                        className={style.answerIcon}
                                        src="/no.svg"
                                    />
                                    <div className={style.noBtn}>NO</div>
                                </div>
                            </div>
                        ))}
                    <div className={style.rightPoll}>
                        <div className={style.totalStake}>760포인트</div>
                    </div>
                </div>
                <div className={style.additionalInfo}>
                    <div className={style.deadline}>
                        {`${outdateDate.toLocaleDateString()}에 마감`}
                    </div>
                    {/* 마감 일시를 누르거나 hover 할 시 공개 일시가 표시됨 */}
                    <div className={style.openDate}>
                        {`${openDateDate.toLocaleDateString()}에 답 공개`}
                    </div>
                </div>
            </div>
            <div className={style.popularity}>
                <div className={style.leftPop}>
                    <div className={style.participants}>
                        <div className={style.popularityTitle}>참여자</div>
                        <div className={style.popularityNum}>75</div>
                    </div>
                    <div className={style.likes}>
                        <div className={style.popularityTitle}>좋아요</div>
                        <div className={style.popularityNum}>30</div>
                    </div>
                    <div className={style.comments}>
                        <div className={style.popularityTitle}>댓글</div>
                        <div className={style.popularityNum}>7</div>
                    </div>
                </div>
                <div className={style.rightPop}>
                    <div className={style.more} onClick={deleteArticle}>...</div>
                </div>
            </div>
        </div>
    );
};

export default Article;
