// api/answers/byarticle/[articleID]

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import { NextApiRequest } from 'next';

const prisma = new PrismaClient();

export async function GET(
  request: NextApiRequest,
  { params }: { params: { articleID: string } }
) {
  // 게시물 ID를 받아서
  // 게시물의 답변 현황과 (예 / 아니오 숫자)
  // 사용자의 답변 현황 ID 보내주기

  const session = await getServerSession(authOptions);

  const articleID = params.articleID;

  const answers = await prisma.answer.findMany({
    where: {
      articleId: articleID,
    },
  });

  const data: { [key: string]: number } = {};
  let yourResponse = undefined;
  let pointSum = 0;

  if (session) {
    answers.forEach((answer) => {
      pointSum += answer.cost;
      if (data[answer.answerVal]) {
        data[answer.answerVal]++;
      } else {
        data[answer.answerVal] = 1;
      }
      if (answer.userId === session.user?.id) {
        // 현재 세션의 답변
        yourResponse = [answer.id, answer.answerVal];
      }
    });
  } else {
    answers.forEach((answer) => {
      if (data[answer.answerVal]) {
        data[answer.answerVal]++;
      } else {
        data[answer.answerVal] = 1;
      }
    });
  }

  return NextResponse.json({
    data,
    yourResponse,
    pointSum,
    totalNum: answers.length,
  });
}
