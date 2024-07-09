import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { IAuthForm } from "../auth.service";
import { toast } from "sonner";
import { DASHBOARD_PAGES } from "@/shared/const/pages-uri.config";

export function useUserSignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const userSignInMutation = useMutation({
    mutationFn: (data:IAuthForm) =>
      signIn("credentials", {
        login:data.login,
        password:data.password,
        callbackUrl: callbackUrl ?? undefined,
        redirect:false
      })
  });

  return {
    isPending: userSignInMutation.isPending,
    signIn: userSignInMutation.mutate,
    is_Status:userSignInMutation.status,
    is_Success:userSignInMutation.isSuccess,
    is_Error:userSignInMutation.reset,
    data:userSignInMutation.data?.error
  };
}


