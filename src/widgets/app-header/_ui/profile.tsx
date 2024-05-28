"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { Ui_Button } from "@/shared/ui/button";
import Link from "next/link";

import { Skeleton } from "@/shared/ui/skeleton";


import { ProfileAvatar } from "@/entities/user/profile";

export function Profile() {
  //const session = useAppSession();
  //const { signOut, isPending: isLoadingSignOut } = useSignOut();

  

  //const user = session?.data?.user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Ui_Button
          variant="ghost"
          className="p-px rounded-full self-center h-8 w-8"
        >
          <ProfileAvatar  className="w-8 h-8" />
        </Ui_Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2 ">
        <DropdownMenuLabel>
          <p>Мой аккаунт</p>
          <p className="text-xs text-muted-foreground overflow-hidden text-ellipsis">
            alex
          </p>
        </DropdownMenuLabel>
        <DropdownMenuGroup></DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={`/profile/`}>
              <User className="mr-2 h-4 w-4" />
              <span>Профиль</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            
            onClick={() => {}//signOut()

            }
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Выход</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}