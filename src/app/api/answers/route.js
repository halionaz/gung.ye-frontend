// api/answers

import { getServerSession } from "next-auth";
import { addDoc, collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "../firebase";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request) {
    // request로부터 받은 데이터 서버에 추가

    const reqData = await request.json();

    const answerVal = reqData.answerVal;
    const article = reqData.article;

    const session = await getServerSession(authOptions);

    if (session) {
        // 사용자가 정상적으로 로그인 했을 때
        const sessionName = session.user?.email;
        const articleRef = doc(db, "articles", article);
        const articleSnapshot = await getDoc(articleRef);
        if (articleSnapshot.exists()) {
            // 아티클이 존재할 때
            if (sessionName !== articleSnapshot.data().writer) {
                // 아티클의 작성자와 답변자가 다를 때 DB 등록
                try {
                    const docRef = await addDoc(collection(db, "answers"), {
                        answerVal,
                        article,
                        respondent: sessionName,
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

    const docRef = doc(db, "answers", answerID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // id에 해당하는 답변 존재
        if (docSnap.data().respondent === session.user?.email) {
            // 답변 작성자와 세션 이메일이 같을 때 삭제 진행
            await deleteDoc(doc(db, "answers", answerID));
        }
    } else {
        return NextResponse.error("해당 ID의 답변이 존재하지 않습니다");
    }

    return NextResponse.json({ answerID });
}
