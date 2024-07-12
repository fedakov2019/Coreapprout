import type { Metadata} from "next";
import { NO_INDEX_PAGE } from "@/shared/const/seo.constants";

import { SignInForm } from "@/features/auth/sign-in-form.server";

export const metadata:Metadata={
    title:'Auth',
    ...NO_INDEX_PAGE
}
export default function AuthPage() {
    return (<main className="grow flex flex-col pt-24">
    <div className="rounded-xl border border-slate-300 px-14 py-8 pb-14 w-full max-w-[400px] bg-cyan-300 self-center">
      <h1 className="text-2xl mb-6">Регистрация</h1>
      <SignInForm />
    </div>
  </main>
    
    

)
}