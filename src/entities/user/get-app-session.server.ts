"use server"

import { getServerSession } from "next-auth"
import { nextAuthConfig } from "./_ui/next-auth-config"

export const getAppSessionServer =()=>getServerSession(nextAuthConfig);