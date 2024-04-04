// api/answers

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "../firebase";
import { authOptions } from "../auth/[...nextauth]/route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request) {
    // request로부터 받은 데이터 서버에 추가

    // COST ::
    // 사용자의 궁예지수가 충분할 때, 답변 가능한 로직

    const reqData = await request.json();

    const answerVal = reqData.answerVal;
    const articleID = reqData.article;

    const session = await getServerSession(authOptions);

    if (session) {
        // 사용자가 정상적으로 로그인 했을 때
        const sessionID = session.user?.id;
        const article = await prisma.article.findUnique({
            where: {
                id: articleID,
            },
        });
        if (article !== null) {
            // 아티클이 존재할 때
            if (sessionID !== article.userId) {
                // 아티클의 작성자와 답변자가 다를 때 DB 등록
                try {
                    await prisma.answer.create({
                        data: {
                            answerVal,
                            articleId: articleID,
                            userId: sessionID,
                            postingDate: new Date().toISOString(),
                            cost: 1,
                        },
                    });
                } catch (err) {
                    return NextResponse.json("서버에 데이터 추가 중 오류", {
                        status: 500,
                    });
                }
                return NextResponse.json("Done It");
            } else {
                return NextResponse.json("403 오류", {
                    status: 403,
                });
            }
        } else {
            return NextResponse.json("아티클이 존재하지 않습니다", {
                status: 404,
            });
        }
    } else {
        return NextResponse.json("세션이 존재하지 않습니다", { status: 401 });
    }
}

export async function DELETE(request) {
    // 답변 ID를 받아
    // 해당 답변을 세션이 맞다면 지우기

    const reqData = await request.json();
    const answerID = reqData.id;

    const session = await getServerSession(authOptions);

    const answer = await prisma.answer.findUnique({
        where: {
            id: answerID,
        },
    });

    if (answer !== null) {
        // id에 해당하는 답변 존재
        if (answer.userId === session.user?.id) {
            // 답변 작성자와 세션 이메일이 같을 때 삭제 진행
            await prisma.answer.delete({
                where: {
                    id: answerID,
                },
            });
            await deleteDoc(doc(db, "answers", answerID));
        }
    } else {
        return NextResponse.json("해당 ID의 답변이 존재하지 않습니다", {
            status: 404,
        });
    }

    return NextResponse.json({ answerID });
}
