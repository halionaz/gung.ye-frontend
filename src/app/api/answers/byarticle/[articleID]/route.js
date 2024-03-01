// api/answers/byarticle/[articleID]

import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/app/api/firebase";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(request, { params }) {
    // 게시물 ID를 받아서
    // 게시물의 답변 현황과 (예 / 아니오 숫자)
    // 사용자의 답변 현황 ID 보내주기

    const session = await getServerSession(authOptions);

    const articleID = params.articleID;

    const answersRef = collection(db, "answers");
    const q = query(answersRef, where("article", "==", articleID));
    const querySnapshot = await getDocs(q);

    const data = {};
    let yourResponse = undefined;

    querySnapshot.forEach((doc) => {
        const answer = doc.data();
        if (data[answer.answerVal]) {
            data[answer.answerVal]++;
        } else {
            data[answer.answerVal] = 1;
        }
        if (answer.respondent === session.user?.email) {
            // 현재 세션의 답변
            yourResponse = doc.id;
        }
    });

    return NextResponse.json({ data, yourResponse });
}
