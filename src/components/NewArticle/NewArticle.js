import { useState } from "react";

const NewArticle = () => {
    const today = new Date();

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [deadline, setDeadline] = useState(
        today.toISOString().substring(0, 10)
    );
    const [imgsrc, setImgsrc] = useState("");

    return (
        <div>
            <input
                name="title"
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
                placeholder="본문을 입력하세요"
                value={text}
                onChange={(event) => {
                    event.preventDefault();
                    setText(event.target.value);
                }}
            />
            <input
                name="deadline"
                type="date"
                value={deadline}
                onChange={(event) => {
                    setDeadline(event.target.value);
                }}
            />
            <input
                name="imgsrc"
                type="url"
                value={imgsrc}
                placeholder="이미지 링크를 입력하세요"
                onChange={(event) => {
                    setImgsrc(event.target.value);
                }}
            />
            <button
                name="submit"
                onClick={(event) => {
                    fetch("/api/articles", {
                        method: "POST",
                        body: JSON.stringify({
                            title: title,
                            text: text,
                            uid: "halion#1234",
                            deadline: deadline,
                            imgsrc,
                        }),
                    }).then((res) => {
                        console.log(res);
                    });
                }}
            >
                제출
            </button>
        </div>
    );
};

export default NewArticle;
