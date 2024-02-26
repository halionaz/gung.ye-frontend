"use client";

import Article from "@/components/Article";
import style from "./Main.module.css";
import Login from "@/components/Login";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import NewArticle from "./NewArticle/NewArticle";

const Main = () => {
    // 로그인 세션 관리
    const { data: session } = useSession();

    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    // 새 아티클 작성 여부
    const [writing, setWriting] = useState(false);

    const refreshData = () => {
        fetch("/api/articles", {
            cache: "no-store",
        })
            .then((res) => res.json())
            .then((data) => {
                setArticles(data);
                setLoading(false);
            });
    };

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <main className={style.main}>
            {session && (
                <div className={style.userInfo}>
                    <img
                        className={style.userImg}
                        src={session.user?.image}
                    ></img>
                    <div>{session.user?.name}</div>
                </div>
            )}
            <Login session={session} />
            <div>
                {session && (
                    <button
                        onClick={() => {
                            setWriting((prev) => {
                                return !prev;
                            });
                        }}
                    >
                        {writing ? "취소" : "새 글 추가"}
                    </button>
                )}
            </div>
            {writing && (
                <NewArticle
                    refreshData={refreshData}
                    setWriting={setWriting}
                    userEmail={session.user?.email}
                />
            )}
            {loading ? (
                <div>로딩중</div>
            ) : (
                articles.map((article, index) => {
                    console.log(article);
                    return (
                        <Article
                            key={index}
                            id={article.id}
                            title={article.title}
                            imgsrc={article.imgsrc}
                            text={article.text}
                            outdate={article.deadline}
                            writer = {article.writer}
                            postingDate={article.postingDate}
                            session={session}
                            refreshData={refreshData}
                        />
                    );
                })
            )}
        </main>
    );
};

export default Main;
