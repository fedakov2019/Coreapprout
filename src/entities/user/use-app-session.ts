"use client"
import { useSession } from "next-auth/react";
export const useAppSession=useSession;
export const useRole=()=>{

    const session=useAppSession();
    return session.data?.user.user.valueRole;
    }
    export const useAcces=()=>{
        const session=useAppSession();
    return session.data?.user.accesToken;
    
    }
    export const useRefr=()=>{
        const session=useAppSession();
    return session.data?.user.refreshToken;
    
    }