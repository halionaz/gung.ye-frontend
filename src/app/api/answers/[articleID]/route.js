import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { NextResponse } from "next/server";
import { useRouter } from "next/router";

export async function GET(){
    // 서버로부터 req 내용에 맞는 답변 데이터 읽어오기

    const router = useRouter();
    const articleID = router.query.articleID;
    console.log(articleID);

    // const answersRef = collection(db, "answers");
    // const q = query(answersRef, where("article", "==", articleID));
    // const querySnapshot = await getDocs(q);

    const data = []
    // querySnapshot.forEach((doc) => {
    //     data.push({...doc.data, id : doc.id});
    // })

    return NextResponse.json(data)
}