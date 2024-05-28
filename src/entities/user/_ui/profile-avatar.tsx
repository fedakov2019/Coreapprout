import { Avatar,  AvatarImage } from "@/shared/ui/avatar";

import { cn } from "@/shared/ui/utils";


export const ProfileAvatar = ({

  className,
}: {

  className?: string;
}) => {
 

  return (
    <Avatar className={cn(className)}>
      <AvatarImage src={"/avatar.jpg"} className="object-cover" />

    </Avatar>
  );
};