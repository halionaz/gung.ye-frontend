import { NextResponse } from "next/server";
import { collection, getDocs, addDoc, Timestamp, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    // 서버로부터 데이터 읽어오기

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
        return NextResponse.json({ title, text, writer, deadline });
    } else {
        return NextResponse.error();
    }
}

export async function DELETE(request) {
    // request로 받은 id에 맞는 게시물 삭제

    const reqData = await request.json();
    const articleID = reqData.id;

    const session = getServerSession(authOptions);
    
    // 현재 세션의 유저와 서버 게시물의 유저가 일치할 때만 삭제 진행 해야 됨 < 진행 중

    await deleteDoc(doc(db, "articles", articleID));

    return NextResponse.json({articleID});

}