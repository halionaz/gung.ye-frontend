// route.js는 Server-Side API를 위한 문서 작성용

import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
