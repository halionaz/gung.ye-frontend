import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { NextResponse } from "next/server";

export async function GET(request, {params}){
    // 게시물 ID를 받아서
    // 게시물의 답변 현황과 (예 / 아니오 숫자)
    // 사용자의 답변 현황 보내주기

    const articleID = params.articleID;

    const answersRef = collection(db, "answers");
    const q = query(answersRef, where("article", "==", articleID));
    const querySnapshot = await getDocs(q);

    const data = []
    querySnapshot.forEach((doc) => {
        data.push({...doc.data(), id : doc.id});
    })

    const yourResponse = "안녕하세요우";

    return NextResponse.json({data, yourResponse })
}