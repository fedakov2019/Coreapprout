
import {AuthOptions, Awaitable, RequestInternal, User} from 'next-auth';
import Credentials from "next-auth/providers/credentials";
import { z } from 'zod';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { type DecodedToken, SessionToken } from 'next-auth';

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
   
        
        const userData = await authService.getUser(
            res!.accessToken,
            res!.cookies!,
          );
            if (userData) {
          cookies().set('access_token', res.accessToken);
          cookies().set(
            'refreshToken',
            res?.cookies![0].match(/refrech-token=([^;]*)/)?.[1]!,
          );

          return {
            accessToken: res!.accessToken,
            
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
    async jwt({token, user}) {
       //return{accessToken: user.tokens.access}
        console.log(token)
        return {...token, ...user}
    },
    async session({session,token}) 
    {
        if (token) {
            const {accessToken, refreshToken, user}=token
        

       session.user.accessToken =accessToken;
       session.user.user=user;
       session.user.refreshToken=refreshToken;
        return session;
    }   
    return session;
    } },

pages:{
    signIn:"/auth/sign-in"
}
}
