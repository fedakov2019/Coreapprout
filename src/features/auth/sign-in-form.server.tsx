"use server"
import { cn } from "@/shared/ui/utils";
import { AuthSignInfForm } from "./_ui/auth-sign-in-form";

export async function SignInForm({className}:{className?:string}) {
    return (
        <div className={cn("grid gap6", className)}>
            {<AuthSignInfForm/>}
        </div>

    );
}