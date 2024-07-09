"use client";
import { useSession } from "next-auth/react";
import {SessionProvider as NextAuthSessionProvider} from "next-auth/react"
export const useAppSession=useSession;

export function AppSessionProvider({children,}:{children?:React.ReactNode}) {
    return (<NextAuthSessionProvider >
        {children}
        </NextAuthSessionProvider>);
}

export const useRole=()=>{

const session=useAppSession();
return session.data?.user.user.valueRole;
}
export const useAcces=()=>{
    const session=useAppSession();
return session.data?.user.accessToken;

}
export const useRefr=()=>{
    const session=useAppSession();
return session.data?.user.refreshToken;

}