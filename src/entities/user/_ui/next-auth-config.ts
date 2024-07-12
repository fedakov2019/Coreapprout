
import {AuthOptions, Awaitable, RequestInternal, User} from 'next-auth';
import Credentials from "next-auth/providers/credentials";


import { cookies } from 'next/headers';


import { authService } from '@/features/auth/auth.service';


export const nextAuthConfig:AuthOptions={
providers: [
    Credentials({
        name: "Credentials",
        credentials: {
            login: { label: "Login", type: "text", placeholder: "Login", required:true },
            password: { label: "Password", type: "password", placeholder: "Password", required:true },
            remember:{label:"Pfgjvybnm vtyz", type:"checkbox", default:false}
        },
        async authorize(credentials, req) {
           const {login,password}=credentials as any;

            
        if (login && password) {
        const res=await authService.main({login,password})
   
        console.log(res!.cookies!)
        const userData = await authService.getUser(
            res!.accessToken,
            res!.cookies![0].match(/refrech-token=([^;]*)/)?.[1]!,
          );
            if (userData) {
          cookies().set('access_token', res.accessToken);
          cookies().set(
            'refreshToken',
            res?.cookies![0].match(/refrech-token=([^;]*)/)?.[1]!,
          );

          return {
            accesToken: res!.accessToken,
            
            refreshToken:
              res?.cookies![0].match(/refrech-token=([^;]*)/)?.[1]!,
            user: userData,
          };} 
       
    
        else {return null}
    }
    return null},


    })
],
session:{
    strategy:"jwt",
},
callbacks:{
    async jwt({token, user,trigger,session}) {
       //return{accessToken: user.tokens.access}
   
       
      
        console.log(token)
        if (token.user?.exp<Date.now()/1000+7100)
          {console.log('токен сдох') 
            console.log(token)
           
        const newTokenData = await authService.getNewTokens({accesToken:token.accesToken as string,refreshToken:token.refreshToken as string});
        console.log('нев токен');
        console.log(newTokenData);
      
        const newUserData = await authService.getUser(newTokenData.accesToken,
          
          newTokenData.refreshToken
          
        );
        
        console.log('новый юзер');
        console.log(newUserData);

        if (newUserData.error !== null && typeof(newUserData.error) !=='undefined') {
          return { ...token, error: 'ErrorRefresh' };
        }

        console.log(
          'Успешно обновили accessToken и refreshToken, когда accessToken сдох',
        );

        cookies().set(
          'access_token',
          newTokenData.accesToken!,
        );
        cookies().set('refreshToken', newTokenData.refreshToken!);
       // updates(newTokenData.newAccessToken!, newTokenData.newRefreshToken!)
        return {
          accesToken: newTokenData!.accesToken,
          
          refreshToken: newTokenData!.refreshToken,
          user: newUserData,
          error: newUserData.error ? newUserData.error : null,
        };
      
      
      } else {


        if (trigger==='update') { console.log('sess2');
          console.log(session);
          return {...token,...session.user,...session.accesToken,...session.refreshToken}
         }
         return {...token, ...user}
      }

      
        
    },
    async session({session,token}) 
    {
  
        if (token) {
            const {accesToken, refreshToken, user}= token
       
      
       session.user.user=user;
       session.user.refreshToken=refreshToken as string;
       session.user.accesToken=accesToken as string;
        return session;
    }   
    return session;
    } },

pages:{
    signIn:"/auth/sign-in"
}
}


