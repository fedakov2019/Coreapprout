import { Ui_Button } from "@/shared/ui/button";
import Image from "next/image";
import {Button} from "@mui/material"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 ">
      <Ui_Button>Buttun</Ui_Button>
      <Button>Buttom</Button>
      
    </main>
  );
}
