import { useState } from "react";
import style from "./NewArticle.module.css";

const NewArticle = ({ refreshData, setWriting, userEmail }) => {

    // 그냥 new Date()로 객체를 만든 뒤 ISOString으로 바꾸면 영국 시간이 나와버림
    // 시차 조정
    const offset = new Date().getTimezoneOffset() * 60000;
    const today = new Date(Date.now() - offset);

    console.log(today.toISOString().substring(0, 10));

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [deadline, setDeadline] = useState(
        today.toISOString().substring(0, 10)
    );
    const [imgsrc, setImgsrc] = useState("");

    return (
        <div className={style.component}>
            <input
                name="title"
                className={style.title}
                type="text"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={(event) => {
                    event.preventDefault();
                    setTitle(event.target.value);
                }}
            />
            <textarea
                name="text"
                className={style.text}
                placeholder="본문을 입력하세요"
                value={text}
                onChange={(event) => {
                    event.preventDefault();
                    setText(event.target.value);
                }}
            />
            <input
                name="deadline"
                className={style.deadline}
                type="date"
                value={deadline}
                onChange={(event) => {
                    setDeadline(event.target.value);
                }}
            />
            <input
                name="imgsrc"
                className={style.imgsrcform}
                type="url"
                value={imgsrc}
                placeholder="이미지 링크를 입력하세요"
                onChange={(event) => {
                    setImgsrc(event.target.value);
                }}
            />
            <button
                name="submit"
                className={style.submit}
                onClick={(event) => {
                    fetch("/api/articles", {
                        method: "POST",
                        body: JSON.stringify({
                            title: title,
                            text: text,
                            uid: userEmail,
                            deadline: deadline,
                            imgsrc,
                        }),
                    }).then((res) => {
                        refreshData();
                        setWriting(false);
                    });
                }}
            >
                제출
            </button>
        </div>
    );
};

export default NewArticle;
