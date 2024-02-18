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
            <Article />
            <Article />
            <Article />
        </main>
    );
}
