"use client";

import Article from "@/components/Article";
import style from "./Main.module.css";
import Login from "@/components/Login";
import { useEffect, useState } from "react";
import NewArticle from "@/components/NewArticle";
import { useSession } from "next-auth/react";

const Main = () => {
    // 로그인 세션 관리
    const { data: session } = useSession();

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    // 새 아티클 작성 여부
    const [writing, setWriting] = useState(false);

    useEffect(() => {
        fetch("/api/articles", {
            cache: "no-store",
        })
            .then((res) => res.json())
            .then((data) => {
                setArticles(data);
                setLoading(false);
            });
    }, []);

    return (
        <main className={style.main}>
            <Login session={session} />
            <button
                onClick={() => {
                    setWriting((prev) => {
                        return !prev;
                    });
                }}
            >
                {writing ? "취소" : "새 글 추가"}
            </button>
            {writing && <NewArticle />}
            {loading ? (
                <div>로딩중</div>
            ) : (
                articles.map((article, index) => {
                    // console.log(article);
                    return (
                        <Article
                            key={index}
                            title={article.title}
                            imgsrc={article.imgsrc}
                            text={article.text}
                            outdate={article.deadline}
                        />
                    );
                })
            )}
        </main>
    );
};

export default Main;
