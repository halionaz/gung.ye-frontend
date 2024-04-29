// api/articles

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  // 서버로부터 데이터 읽어오기

  // 정렬 기능 나중에 추가

  const data = await prisma.article.findMany();

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  // request로부터 받은 데이터 서버에 추가

  const reqData = await request.json();
  const title = reqData.title;
  const text = reqData.text;
  const deadline = reqData.deadline;
  const openDate = reqData.openDate;
  const imgsrc = reqData.imgsrc;

  const session = await getServerSession(authOptions);

  if (session) {
    // 사용자가 정상적으로 로그인 했을 때만 DB에 등록
    try {
      const article = await prisma.article.create({
        data: {
          title,
          text,
          userId: session.user?.id,
          imgsrc,
          postingDateTime: new Date().toISOString(),
          dueDateTime: new Date(deadline).toISOString(),
          openDateTime: new Date(openDate).toISOString(),
        },
      });
    } catch (err) {
      return NextResponse.json('서버에 데이터가 업로드 되지 않음', {
        status: 500,
      });
    }
    return NextResponse.json('정상적으로 업로드 완료');
  } else {
    return NextResponse.json('세션이 존재하지 않습니다', { status: 401 });
  }
}

export async function DELETE(request: Request) {
  // request로 받은 id에 맞는 게시물 삭제

  const reqData = await request.json();
  const articleID = reqData.id;

  const session = await getServerSession(authOptions);

  const article = await prisma.article.findUnique({
    where: {
      id: articleID,
    },
  });

  if (article !== null && session) {
    // 게시물이 존재하고 session이 존재하며
    if (article.userId === session.user?.id) {
      // 게시물의 작성자와 세션이 같을 때 삭제 진행
      const deleteArticle = await prisma.article.delete({
        where: {
          id: articleID,
        },
      });
      return NextResponse.json({ deleteArticle });
    }
  } else {
    return NextResponse.json('해당 ID의 게시글이 존재하지 않습니다', {
      status: 404,
    });
  }

  return NextResponse.json({ articleID });
}
