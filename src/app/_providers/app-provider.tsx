"use client";


import { ThemeProvider } from "@/features/theme/theme-provider";

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import React from "react";

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider >

      <ThemeProvider />
   
     
      {children}
      </AppRouterCacheProvider >
  
  );
}