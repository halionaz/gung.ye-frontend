const NewArticle = () => {
    return (
        <div>
            <form action="/api/articles" method="post">
                <input
                    name="title"
                    type="text"
                    placeholder="제목을 입력하세요"
                ></input>
                <textarea
                    name="text"
                    placeholder="본문을 입력하세요"
                ></textarea>
                <input name="deadline" type="date"></input>
            </form>
        </div>
    );
};

export default NewArticle;
