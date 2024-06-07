"use client";
import { useSession } from "next-auth/react";
import {SessionProvider as NextAuthSessionProvider} from "next-auth/react"
export function AppSessionProvider({children,}:{children?:React.ReactNode}) {
    return (<NextAuthSessionProvider>
        {children}
        </NextAuthSessionProvider>);
}
export const useAppSession=useSession;
export const useRole=()=>{

const session=useAppSession();
return session.data?.user.user.valueRole;
}