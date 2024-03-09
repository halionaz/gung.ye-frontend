import { Timestamp } from "firebase/firestore";
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
    session,
    refreshData,
}) => {
    
    const outdateDate = new Timestamp(
        outdate.seconds,
        outdate.nanoseconds
    ).toDate();
    const postingDateDate = new Timestamp(
        postingDate.seconds,
        postingDate.nanoseconds
    ).toDate();

    const [answerData, setAnswerData] = useState({});
    const [myAnswer, setMyAnswer] = useState(undefined);

    const refreshArticleData = () => {
        fetch(`/api/answers/byarticle/${id}`, {
            cache: "no-store",
        })
            .then((res) => res.json())
            .then((data) => {
                setAnswerData(data.data);
                setMyAnswer(data.yourResponse);
            });
    };

    useEffect(() => {
        // article 컴포넌트가 업데이트 될 때
        // 이 article에 답변된 answer 데이터 가져오기
        refreshArticleData();
    }, []);

    return (
        <div className={style.articleBox}>
            <img className={style.articleImg} src={imgsrc}></img>
            <div className={style.content}>
                <div className={style.noneInteraction}>
                    <div className={style.context}>
                        <h2 className={style.articleHeading}>{title}</h2>
                        <div className={style.artContents}>{text}</div>
                    </div>
                    <div className={style.articleInfo}>
                        <div className={style.outdate}>
                            EXP : {outdateDate.toLocaleDateString()}
                        </div>
                        <div className={style.postingDate}>
                            업로드 : {postingDateDate.toLocaleDateString()}
                        </div>
                        <div className={style.writer}>{writer}</div>
                    </div>
                </div>
                <div className={style.btm}>
                    {session?.user.email === writer ? (
                        // 본인이 작성한 아티클인 경우
                        <div>내가 작성한 게시글</div>
                    ) : myAnswer ? (
                        // 남이 작성했고, 답변이 완료된 아티클인 경우
                        <div>
                            답변 완료{" "}
                            <button
                                onClick={() => {
                                    // 내 답변을 삭제하는 메소드
                                    fetch(`api/answers`, {
                                        method: "DELETE",
                                        body: JSON.stringify({
                                            id: myAnswer,
                                        }),
                                    }).then((res) => {
                                        refreshArticleData();
                                    });
                                }}
                            >
                                답변 삭제
                            </button>
                        </div>
                    ) : (
                        // 남이 작성했고, 미답변한 아티클인 경우
                        <div className={style.btns}>
                            <div
                                className={[style.btn, style.yes].join(" ")}
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
                                예
                            </div>
                            <div
                                className={[style.btn, style.no].join(" ")}
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
                                아니오
                            </div>
                        </div>
                    )}

                    {session?.user.email === writer && (
                        <div
                            className={style.deleteBtn}
                            onClick={() => {
                                fetch("/api/articles", {
                                    method: "DELETE",
                                    body: JSON.stringify({
                                        id,
                                    }),
                                }).then(() => {
                                    refreshData();
                                });
                            }}
                        >
                            삭제
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Article;
