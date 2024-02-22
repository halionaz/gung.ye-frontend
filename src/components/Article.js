import style from "./Article.module.css";

const Article = ({ title, imgsrc, text }) => {
    return (
        <div className={style.articleBox}>
            <img className={style.articleImg} src={imgsrc}></img>
            <div className={style.content}>
                <div className={style.noneInteraction}>
                    <div className={style.context}>
                        <h2 className={style.articleHeading}>{title}</h2>
                        <div className={style.artContents}>{text}</div>
                    </div>
                    <div className={style.date}>EXP : 2024/02/14</div>
                </div>
                <div className={style.btm}>
                    <div className={style.btns}>
                        <div className={[style.btn, style.yes].join(" ")}>
                            예
                        </div>
                        <div className={[style.btn, style.no].join(" ")}>
                            아니오
                        </div>
                    </div>
                    <div className={style.goFull}>바로가기</div>
                </div>
            </div>
        </div>
    );
};

export default Article;
