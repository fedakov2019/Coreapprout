
import { encode, getToken, JWT } from 'next-auth/jwt';

import { NextMiddleware, NextRequest, NextResponse } from 'next/server';
import { useAppSession } from './entities/user/app-session-provider';
import { SessionEntity } from './entities/user/_domain/types';
import { cookies } from 'next/headers';
import { authService } from './features/auth/auth.service';
import { apiInstance } from './shared/api/api-instance';
import { getNewTokensmid } from './features/auth/auth.client';

export {default} from 'next-auth/middleware'
export const config ={matcher:['/auth/:path', '/i/:path*']}
const sessionCookie = process.env.NEXTAUTH_URL?.startsWith("https://")
  ? "__Secure-next-auth.session-token"
  : "next-auth.session-token";


  export const SIGNIN_SUB_URL = '/api/auth/signin';
export const SESSION_TIMEOUT = 60 * 60 * 24 * 28; // 28 day
export const TOKEN_REFRESH_BUFFER_SECONDS = 300;
export const SESSION_SECURE = process.env.NEXTAUTH_URL?.startsWith('https://');
export const SESSION_COOKIE = 'next-auth.session-token';
 export function shouldUpdateToken(token: JWT): boolean {
  if (token.user.exp < (Date.now()/1000 )+7150) return false; // берем 40 сек. буффером
  else return true;
  }
 


 export function updateCookie(
  sessionToken: string | null,
  request: NextRequest,
  response: NextResponse,
): NextResponse<unknown> {
  /*
   * 1. Установить cookies запроса для входещейго getServerSession для чтения новой сессии
   * 2. Обновленные cookies запроса могут быть переданы на сервер только в том случае, если они были переданы тут после обновлений
   * 3. Устанавливаем cookies ответа для отправки обратно в браузер
   */

  if (sessionToken) {
    // Set the session token in the request and response cookies for a valid session
    request.cookies.set(SESSION_COOKIE, sessionToken);
    response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
    response.cookies.set(SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      maxAge: SESSION_TIMEOUT,
      secure: SESSION_SECURE,
    });
  }
  return response;
}



function signOut(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/api/auth/signin", request.url));
  response.cookies.delete('access_token');
  response.cookies.delete('refreshToken');
  request.cookies.getAll().forEach((cookie) => {
    if (cookie.name.includes("next-auth"))
      response.cookies.delete(cookie.name);
  });

  return response;
}
//const {data:session, update} = useAppSession();
//async function updateSession() {
//  await update({...session, 
//    user:{...session?.user,
      
 //   },accessToken:'erer'
 // })
//}
export const middleware: NextMiddleware = async (request: NextRequest) => {
    console.log("Executed middleware")

    let sessions = await getToken({ req: request })
  console.log('session');
  console.log(sessions);
    if (!sessions) return signOut(request)
  
    let response = NextResponse.next()
    let tokenUpdate=null;
    let refrechUpdate=null;
    if (
      sessions &&
      sessions.error !== 'ErrorRefresh' &&
 
      shouldUpdateToken(sessions)
    ) {
      const accessTokenOnCookie = cookies().get('access_token')?.value;
      const refreshTokenOnCookies = cookies().get('refreshToken')?.value;
  
      if (
        accessTokenOnCookie &&
        refreshTokenOnCookies &&
        sessions.refreshToken !== refreshTokenOnCookies &&
        sessions.accesToken !== accessTokenOnCookie
      ) {
        console.log(
          'Проверка middleware. Токены обновились через baseQueryWithRefreshToken, обновим данные и в сессии через middleware',
        );
        sessions.refreshToken = refreshTokenOnCookies;
        sessions.accesToken = accessTokenOnCookie;
        const newUserData = await authService.getUser(accessTokenOnCookie, refreshTokenOnCookies);
        console.log(
          'Новыйе данные после baseQueryWithRefreshToken из middleware',
          newUserData,
        );
        tokenUpdate=accessTokenOnCookie;
        refrechUpdate=refreshTokenOnCookies;
        const newSessionToken= await encode({
          secret: process.env.NEXTAUTH_SECRET!,
          token: {accesToken:tokenUpdate,refreshToken:refrechUpdate,user:newUserData},
          maxAge: SESSION_TIMEOUT,
        });
        response = updateCookie(newSessionToken, request, response);
      } }
      else {
        console.log(
          'AccessToken умер - нужно обновить, старый токен в middleware -> ',
          sessions,
        );
        const newTokenData = await authService.getNewTokensmid({accesToken:sessions.accesToken as string,refreshToken:sessions.refreshToken as string});
        console.log('Новый токен из middleware', newTokenData); 
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
        const newUserData = await authService.getUser(newTokenData.accesToken,
          
          newTokenData.refreshToken);

          console.log('Новый пользователь из middleware', newUserData);  
          tokenUpdate = newTokenData.accesToken;
          refrechUpdate = newTokenData.refreshToken;
    
          //Делаем новую session для nextAuth
          const newSessionToken = await encode({
            secret: process.env.NEXTAUTH_SECRET!,
            token: {accesToken:tokenUpdate,refreshToken:refrechUpdate,user:newUserData},
            maxAge: SESSION_TIMEOUT,
          });
    
          //Обновляем полученную сессию в nextAuth
          response = updateCookie(newSessionToken, request, response);
          if (tokenUpdate && refrechUpdate) {
            response.cookies.set('access_token', tokenUpdate);
            response.cookies.set('refreshToken', refrechUpdate);
          }
        }
  

      
    


    return response
}

