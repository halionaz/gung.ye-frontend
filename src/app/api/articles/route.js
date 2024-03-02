// api/articles

import { NextResponse } from "next/server";
import {
    collection,
    getDocs,
    addDoc,
    Timestamp,
    doc,
    deleteDoc,
    getDoc,
    query,
    orderBy,
} from "firebase/firestore";
import { db } from "../firebase";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    // 서버로부터 데이터 읽어오기

    const articleRef = collection(db, "articles");
    const q = query(articleRef, orderBy("deadline"), orderBy("postingDate"));
    const querySnapshot = await getDocs(q);

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
    const deadline = reqData.deadline;
    const imgsrc = reqData.imgsrc;

    const session = await getServerSession(authOptions);

    if (session) {
        // 사용자가 정상적으로 로그인 했을 때만 DB에 등록
        try {
            const docRef = await addDoc(collection(db, "articles"), {
                title,
                text,
                writer: session.user?.email,
                deadline: Timestamp.fromDate(new Date(deadline)),
                postingDate: Timestamp.fromDate(new Date()),
                imgsrc,
            });
        } catch (err) {
            return NextResponse.err("서버에 데이터가 업로드 되지 않음");
        }
        return NextResponse.json({ title, text, writer, deadline });
    } else {
        return NextResponse.error("세션이 존재하지 않습니다");
    }
}

export async function DELETE(request) {
    // request로 받은 id에 맞는 게시물 삭제

    const reqData = await request.json();
    const articleID = reqData.id;

    const session = await getServerSession(authOptions);

    const docRef = doc(db, "articles", articleID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // request 게시물이 존재하고,
        if (docSnap.data().writer === session.user?.email) {
            // 게시물의 작성자와 세션 이메일이 같을 때 삭제 진행
            await deleteDoc(doc(db, "articles", articleID));
        }
    } else {
        return NextResponse.error("해당 ID의 게시글이 존재하지 않습니다");
    }

    return NextResponse.json({ articleID });
}
