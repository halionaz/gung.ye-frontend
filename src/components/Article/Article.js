// Main에 올라가는 신탁 컴포넌트

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
    openDate,
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
    const openDateDate = new Timestamp(
        openDate.seconds,
        openDate.nanoseconds
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
    const getProfileImg = () => {
        // 작성자의 프로필 이미지를 가지고 옴
    };

    useEffect(() => {
        // article 컴포넌트가 업데이트 될 때
        // 이 article에 답변된 answer 데이터 가져오기
        refreshArticleData();
    }, []);

    return (
        <div className={style.article}>
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
                        <div className={style.postingDate}>
                            {postingDateDate.toLocaleDateString()}
                        </div>
                    </div>
                    <div className={style.lowerProfile}>
                        <div className={style.gungyePoint}>368</div>
                        <div className={style.profileBadge}>멋진거</div>
                    </div>
                </div>
            </div>
            <div className={style.main}>
                <div className={style.contents}>
                    <div className={style.title}>{title}</div>
                    <div className={style.detailContents}>
                        {imgsrc && (
                            <div className={style.imgBox}>
                                <img
                                    className={style.articleImg}
                                    src={imgsrc}
                                ></img>
                            </div>
                        )}
                        <div className={style.text}>{text}</div>
                    </div>
                </div>
                <div className={style.poll}>
                    {/* 얘는 본인이 작성자인 경우,
                    답변이 완료된 경우,
                    답변을 안 한 경우로 세가지 나눠 작성 */}
                    <div className={style.leftPoll}>
                        <div className={style.yesBtn}>YES</div>
                        <div className={style.noBtn}>NO</div>
                    </div>
                    <div className={style.rightPoll}>
                        <div className={style.totalStake}>760</div>
                    </div>
                </div>
                <div className={style.additionalInfo}>
                    <div className={style.deadline}>
                        {outdateDate.toLocaleDateString()}
                    </div>
                    {/* 마감 일시를 누르거나 hover 할 시 공개 일시가 표시됨 */}
                    <div className={style.openDate}>
                        {openDateDate.toLocaleDateString()}
                    </div>
                </div>
            </div>
            <div className={style.popularity}>
                <div className={style.participants}>70명</div>
                <div className={style.likes}>30</div>
                <div className={style.comments}>7</div>
            </div>
        </div>
    );

    // <div className={style.btm}>
    //     {session?.user.email === writer ? (
    //         // 본인이 작성한 아티클인 경우
    //         <div>내가 작성한 게시글</div>
    //     ) : myAnswer ? (
    //         // 남이 작성했고, 답변이 완료된 아티클인 경우
    //         <div>
    //             답변 완료{" "}
    //             <button
    //                 onClick={() => {
    //                     // 내 답변을 삭제하는 메소드
    //                     fetch(`api/answers`, {
    //                         method: "DELETE",
    //                         body: JSON.stringify({
    //                             id: myAnswer,
    //                         }),
    //                     }).then((res) => {
    //                         refreshArticleData();
    //                     });
    //                 }}
    //             >
    //                 답변 삭제
    //             </button>
    //         </div>
    //     ) : (
    //         // 남이 작성했고, 미답변한 아티클인 경우
    //         <div className={style.btns}>
    //             <div
    //                 className={[style.btn, style.yes].join(" ")}
    //                 onClick={() => {
    //                     fetch(`api/answers`, {
    //                         method: "POST",
    //                         body: JSON.stringify({
    //                             answerVal: "yes",
    //                             article: id,
    //                         }),
    //                     }).then(() => {
    //                         refreshArticleData();
    //                     });
    //                 }}
    //             >
    //                 예
    //             </div>
    //             <div
    //                 className={[style.btn, style.no].join(" ")}
    //                 onClick={() => {
    //                     fetch(`api/answers`, {
    //                         method: "POST",
    //                         body: JSON.stringify({
    //                             answerVal: "no",
    //                             article: id,
    //                         }),
    //                     }).then(() => {
    //                         refreshArticleData();
    //                     });
    //                 }}
    //             >
    //                 아니오
    //             </div>
    //         </div>
    //     )}

    //     {session?.user.email === writer && (
    //         <div
    //             className={style.deleteBtn}
    //             onClick={() => {
    //                 fetch("/api/articles", {
    //                     method: "DELETE",
    //                     body: JSON.stringify({
    //                         id,
    //                     }),
    //                 }).then(() => {
    //                     refreshData();
    //                 });
    //             }}
    //         >
    //             삭제
    //         </div>
    //     )}
    // </div>
};

export default Article;
