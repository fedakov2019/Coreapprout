import { getToken } from 'next-auth/jwt';
import { NextMiddleware, NextRequest, NextResponse } from 'next/server';

export {default} from 'next-auth/middleware'
export const config ={matcher:['/auth/:path', '/i/:path*']}
const sessionCookie = process.env.NEXTAUTH_URL?.startsWith("https://")
  ? "__Secure-next-auth.session-token"
  : "next-auth.session-token";

function signOut(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/api/auth/signin", request.url));

  request.cookies.getAll().forEach((cookie) => {
    if (cookie.name.includes("next-auth"))
      response.cookies.delete(cookie.name);
  });

  return response;
}
export const middleware: NextMiddleware = async (request: NextRequest) => {
    console.log("Executed middleware")
  
    const session = await getToken({ req: request })
  
    if (!session) return signOut(request)
  
    const response = NextResponse.next()
    return response
}