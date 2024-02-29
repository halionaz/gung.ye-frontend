import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(request, {params}){
    // 게시물 ID를 받아서
    // 게시물의 답변 현황과 (예 / 아니오 숫자)
    // 사용자의 답변 현황 ID 보내주기

    const session = await getServerSession(authOptions);

    const articleID = params.articleID;

    const answersRef = collection(db, "answers");
    const q = query(answersRef, where("article", "==", articleID));
    const querySnapshot = await getDocs(q);

    const data = [0, 0]; // 예, 아니오
    let yourResponse = undefined;

    querySnapshot.forEach((doc) => {
        const answer = doc.data();
        if(answer.answerVal === "yes"){
            data[0]++;
        } else if (answer.answerVal === "no"){
            data[1]++;
        }
        if(answer.respondent === session.user?.email){
            // 현재 세션의 답변
            yourResponse = doc.id;
        }
    })


    return NextResponse.json({data, yourResponse })
}