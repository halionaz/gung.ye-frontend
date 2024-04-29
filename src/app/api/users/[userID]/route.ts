// api/users/[userID]

import json from '@/utils/json';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { userID: string } }
) {
  // 유저 ID를 받아
  // 유저 데이터를 보내주기

  const userID = params.userID;

  // ID를 통해 data 불러오기

  const data = await prisma.user.findUnique({
    where: {
      id: userID,
    },
  });

  if (data !== null) {
    // BigInt -> number 호환을 위해 따로 만든 util json 이용
    return NextResponse.json(json(data));
  } else {
    return NextResponse.json('NO DATA', { status: 404 });
  }
}
