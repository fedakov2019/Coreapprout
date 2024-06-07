"use client";


import { ThemeProvider } from "@/features/theme/theme-provider";
import { ComposeChildren } from "@/shared/lib/react";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { queryClient } from "@/shared/api/query-client";
import { Toaster } from "sonner";
import { AppSessionProvider } from "@/entities/user/app-session-provider";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider >
    <ComposeChildren>
   
    <AppSessionProvider/>
      <ThemeProvider />
      <QueryClientProvider client={queryClient} />
     
      {children}
   
      </ComposeChildren>
      <Toaster
        theme='dark'  
        position="bottom-right"
        duration={3500}
        />
      </AppRouterCacheProvider>
  
  );
}