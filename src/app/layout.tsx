import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/shared/ui/utils";
import {Toaster} from 'sonner';

import { AppHeader } from "@/widgets/app-header/app-header";
import { AppProvider } from "./_providers/app-provider";

const fontSans = Inter({ subsets: ["latin","cyrillic"],
variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body  className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
      <AppProvider>
       
        
        {children}
        
        </AppProvider>
        
      </body>
    </html>
  );
}
