// api/answers/[answerID]

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    // 답변 ID를 받아
    // 답변 데이터를 보내주기

    const answerID = params.answerID;

    // ID를 통해 Doc 불러오기
    const data = await prisma.answer.findUnique({
        where: {
            id: answerID,
        },
    });

    console.log(data);

    if (data !== null) {
        return NextResponse.json(data);
    } else {
        return NextResponse.json("NO DATA", { status: 404 });
    }
}
