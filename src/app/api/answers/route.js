// api/answers

import { getServerSession } from "next-auth";
import { addDoc, collection, deleteDoc, doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "../firebase";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request){
    // request로부터 받은 데이터 서버에 추가

    const reqData = await request.json();

    const answerVal = reqData.answerVal;
    const article = reqData.article;

    const session = await getServerSession(authOptions);

    if(session){
        // 사용자가 정상적으로 로그인 했을 때 DB 등록
        try {
            const docRef = await addDoc(collection(db, "answers"), {
                answerVal,
                article,
                respondent: session.user?.email,
            });
        } catch (err) {
            return NextResponse.error("서버에 데이터 추가 중 오류");
        }

        return NextResponse.json("Done It");
    } else {
        return NextResponse.error("세션이 존재하지 않습니다");
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