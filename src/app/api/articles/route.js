import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function GET(request) {
    const querySnapshot = await getDocs(collection(db, "articles"));

    const data = [];
    querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
    });
    
    return NextResponse.json(data);
}
