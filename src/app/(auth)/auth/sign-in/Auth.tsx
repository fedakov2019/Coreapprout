'use client'
import { IAuthForm, authService } from '@/features/auth/auth.service';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {SubmitHandler, useForm} from 'react-hook-form'
import {useMutation} from '@tanstack/react-query'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/shared/ui/form"
  import { Input } from "@/shared/ui/input"
import { toast } from 'sonner';
import { DASHBOARD_PAGES } from '@/shared/const/pages-uri.config';
import { Checkbox } from '@/shared/ui/checkbox';
import { Ui_Button } from '@/shared/ui/button';
import {  errorCatchax } from '@/shared/api/error';
import { useUserSignIn } from '@/features/auth/_vm/use-user-sign-in';


const formSchema = z.object({
    login: z.string().min(1, {
      message: "Имя пользователя не пустое значение",
    }),
    password: z.string().min(3, {
        message: "Пароль минимум 3 символа",
      }),
    remember: z.boolean().default(false).optional(),
  })
export function Auth() {
    const form=useForm<z.infer<typeof formSchema>>({
        mode:'onChange',resolver: zodResolver(formSchema),
        defaultValues: {
          login: "",
          password:"",
          remember:false,
        },
    });
    const [isLoginForm,setLoginForm]=useState(false)
    const {push}=useRouter();
    const logreg=isLoginForm? 'login':'register';
    const userSignIn = useUserSignIn();
  
    const onSubmit:SubmitHandler<z.infer<typeof formSchema>>=data=>{userSignIn.signIn(data)}
   if (userSignIn.is_Status==='success') {
  
   
    
    if (!userSignIn.data)
    {toast.success('Успешный вход!')
 
   //form.reset()
     push(DASHBOARD_PAGES.HOME)
    }
  else
  { toast.error("Не верное имя пользователя или пароль");
  userSignIn.is_Error();
    form.reset()
   }
}
    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <FormField
            control={form.control}
            
            name="login"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя</FormLabel>
                <FormControl>
                  <Input placeholder="login" id='login' {...field}  />
                </FormControl>
              
                <FormMessage />
              </FormItem>
            )}
          />
             <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Пароль</FormLabel>
                <FormControl>
                  <Input placeholder="password" id='password' type= "password" {...field} />
                </FormControl>
              
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
          control={form.control}
          name="remember"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Запомнить меня
                </FormLabel>
                
              </div>
            </FormItem>
          )}
        />
          <Ui_Button disabled={userSignIn.isPending} className='text-white bg-teal-500 hover:bg-teal-600 disabled:opacity-50 shadow shadow-teal-500/30 ' type="submit">Войти</Ui_Button>
        </form>
      </Form>
    
    )
}


