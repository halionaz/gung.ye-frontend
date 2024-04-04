// api/users/[userID]

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request, { params }) {
    // 유저 ID를 받아
    // 유저 데이터를 보내주기

    const userID = params.userID;

    // ID를 통해 data 불러오기

    // 그냥 불러오니 gungyePoint 자료형인 bigInt와 호환이 이상함
    // 전처리 설정을 해주자
    BigInt.prototype.toJSON = function () {
        const int = Number.parseInt(this.toString());
        return int ?? this.toString();
      };
    const data = await prisma.user.findUnique({
        where: {
            id: userID,
        },
    });

    if (data !== null) {
        return NextResponse.json(data);
    } else {
        return NextResponse.json("NO DATA", { status: 404 });
    }
}
