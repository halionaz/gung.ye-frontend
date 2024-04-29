import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function GET(request: NextApiRequest) {
  // cookie로 제공되는 JSON WEB Token 디코딩
  const token = await getToken({ req: request });
  return NextResponse.json(token);
}
