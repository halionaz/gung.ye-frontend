import { NextResponse } from "next/server";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request) {
    // 서버로 부터 데이터 읽어오기

    const querySnapshot = await getDocs(collection(db, "articles"));

    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
    });

    return NextResponse.json(data);
}

export async function POST(request) {
    // request로부터 받은 데이터 서버에 추가

    const reqData = await request.json();
    const title = reqData.title;
    const text = reqData.text;
    const writer = reqData.uid;
    const deadline = reqData.deadline;
    const imgsrc = reqData.imgsrc;

    const session = getServerSession(authOptions);

    if (session) {
        
        // 사용자가 정상적으로 로그인 했을 때만 DB에 등록

        try {
            const docRef = await addDoc(collection(db, "articles"), {
                title,
                text,
                writer,
                deadline: Timestamp.fromDate(new Date(deadline)),
                postingDate: Timestamp.fromDate(new Date()),
                imgsrc,
            });
        } catch (err) {
            console.error(err);
        }
        console.log("정상 제출");
        return NextResponse.json({ title, text, writer, deadline });
    } else {
        console.log("이상 제출");
        return NextResponse.error();
    }
}
