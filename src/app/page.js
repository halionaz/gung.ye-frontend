"use client";

import Article from "@/components/Article";
import style from "./page.module.css";
import Login from "@/components/Login";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Home() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

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
                    // 새 글을 추가하는 로직
                }}
            >
                새 글 추가
            </button>
            {loading ? (
                <div>로딩중</div>
            ) : (
                articles.map((article, index) => {
                    // console.log(article);
                    return <Article key={index} title={article.title} imgsrc = {article.imgsrc} text={article.text} />;
                })
            )}
        </main>
    );
}
