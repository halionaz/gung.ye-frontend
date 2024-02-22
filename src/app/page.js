"use client";

import Article from "@/components/Article";
import style from "./page.module.css";
import Login from "@/components/Login";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
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
        <main className={style.home}>
            <SessionProvider>
                <Login />
            </SessionProvider>
            <button
                onClick={() => {
                    setWriting((prev) => {
                        return !prev;
                    });
                }}
            >
                {writing ? "취소" : "새 글 추가"}
            </button>
            {writing && <div className={style.newArticle}>새 글 작성창</div>}
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
}
