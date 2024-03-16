import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {

    // cookie로 제공되는 JSON WEB Token 디코딩
    const token = await getToken({ req: request });
    return NextResponse.json(token);
}
