// api/answers/[answerID]

import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "../../firebase";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request, { params }) {
    // 답변 ID를 받아
    // 답변 데이터를 보내주기

    const answerID = params.answerID;

    // ID를 통해 Doc 불러오기
    const answerRef = doc(db, "answers", answerID);
    const answerSnapshot = await getDoc(answerRef);

    if (answerSnapshot.exists()) {
        return NextResponse.json(answerSnapshot.data());
    } else {
        return NextResponse.error({ message: "NO DATA" });
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
    }

    return NextResponse.json({ answerID });
}
