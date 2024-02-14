import style from "./Article.module.css";

const Article = () => {
    return (
        <div className={style.articleBox}>
            <img
                className={style.articleImg}
                src="https://assets.community.lomography.com/86/93d57e0bd8e88f6890c1687803700ab45f3007/576x576x2.jpg?auth=fb4474f73f10307f800cfe75a5a7052702f6d316"
            ></img>
            <div className={style.content}>
                <div className={style.noneInteraction}>
                    <div className={style.context}>
                        <h2 className={style.articleHeading}>2023년에 병사 월급이 100만원으로 오를까요?</h2>
                        <div className={style.artContents}>
                            불어 미인을 가치를 청춘 내려온 교향악이다. 트고,
                            속잎나고, 있는 설레는 얼마나 이상 것은 작고 것이다.
                            맺어, 사랑의 청춘 앞이 끓는 쓸쓸한 그들의 사막이다.
                            투명하되 가슴이 못할 끓는 청춘 가는 아름다우냐?
                            얼음이 사랑의 더운지라 있으며, 사랑의 대한 청춘
                            구하기 청춘이 있는가? 인간이 구하지 놀이 이상 청춘
                            군영과 속잎나고, 끓는다. 청춘 우리의 위하여 것이다.
                            방지하는 실로 되려니와, 봄바람을 때문이다. 천고에
                            얼음 전인 인생을 힘차게 목숨이 그들의 우리의 주는
                            ...
                        </div>
                    </div>
                    <div className={style.date}>EXP : 2024/02/14</div>
                </div>
                <div className={style.btns}>
                    <div className={[style.btn, style.yes].join(" ")}>예</div>
                    <div className={[style.btn, style.no].join(" ")}>아니오</div>
                </div>
            </div>
        </div>
    );
};

export default Article;
