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

    useEffect(() => {

        // article 컴포넌트가 업데이트 될 때
        // 이 article에 답변된 answer 데이터 가져오기

        fetch(`/api/answers/byarticle/${id}`, {
            cache: "no-store",
        })
            .then((res) => res.json())
            .then((data) => {
                setAnswerData(data.data);
                setMyAnswer(data.yourResponse);
            });
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
                    {myAnswer ? (
                        <div>
                            답변 완료{" "}
                            <button
                                onClick={() => {
                                    // 내 답변을 삭제하는 메소드
                                    fetch(`api/answers/${myAnswer}`, {
                                        method: "DELETE",
                                        body: JSON.stringify({
                                            id: myAnswer,
                                        }),
                                    }).then((res) => {
                                        refreshData();
                                    });
                                }}
                            >
                                답변 삭제
                            </button>
                        </div>
                    ) : (
                        <div className={style.btns}>
                            <div className={[style.btn, style.yes].join(" ")}>
                                예
                            </div>
                            <div className={[style.btn, style.no].join(" ")}>
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
                                }).then((res) => {
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
