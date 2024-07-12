"use client";
import { useRole } from "@/entities/user/use-app-session";
import { Ui_Button } from "@/shared/ui/button";

import {Button} from "@mui/material"
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session} =useSession();
  console.log({session});
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <Ui_Button>Buttun</Ui_Button>
      <div>Hjkm gjkmpjdfntkz {useRole()}</div>
      <Button>Buttom</Button>
      
    </main>
  );
}