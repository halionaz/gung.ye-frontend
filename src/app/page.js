"use client";

import Article from "@/components/Article";
import style from "./page.module.css";
import Login from "@/components/Login";
import { SessionProvider } from "next-auth/react";

export default function Home() {
    return (
        <main className={style.home}>
            <SessionProvider>
                <Login />
            </SessionProvider>
            <button onClick={()=>{
                // 새 글을 추가하는 로직
            }}>새 글 추가</button>
            <Article />
            <Article />
            <Article />
        </main>
    );
}
