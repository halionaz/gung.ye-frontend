"use client";

import Main from "@/components/Main/Main";
import { SessionProvider } from "next-auth/react";

export default function Home() {
    return (
        <SessionProvider>
            <Main />
        </SessionProvider>
    );
}
