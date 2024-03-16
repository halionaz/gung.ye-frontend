// route.js는 Server-Side API를 위한 문서 작성용

import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

const prisma = new PrismaClient();

const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
