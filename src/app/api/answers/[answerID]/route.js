// api/answers/[answerID]

import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";
import { db } from "../../firebase";

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