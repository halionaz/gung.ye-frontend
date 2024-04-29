// route.js는 Server-Side API를 위한 문서 작성용

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { NextAuthOptions, Session, SessionStrategy, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';

// use `prisma` in your application to read and write data in your DB
const prisma = new PrismaClient();

const strategy: SessionStrategy = 'jwt';

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET!,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: strategy,
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, token }: { session: Session; token: JWT }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }: { user: User; token: JWT }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };
