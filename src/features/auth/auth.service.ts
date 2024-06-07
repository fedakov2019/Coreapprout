
import { apiInstance, instanceretry } from "../../shared/api/api-instance"
import { removeFromStore, saveTokenStore } from "./auth-token.service";
type LoginType = { accesToken: string };
export type Role = "ADMIN" | "USER";
type UserType ={id: number,
login: string,
rolesId: number,
valueRole: Role,
iat: number,
exp: number
};

export type IAuthForm = {login:string, password:string }
export const authService ={
 async getNewTokens() {
    const response= await apiInstance.post<LoginType>("/auth/sign-refrech")
    if (response.data.accesToken) saveTokenStore(response.data.accesToken)
        return response
 },
 async main(data: IAuthForm) {
    const response = await apiInstance.post<LoginType>('/auth/sign-in',data)
    if (response.data.accesToken) saveTokenStore(response.data.accesToken)
     
        return {response, accessToken:response.data.accesToken, cookies:response.headers['set-cookie']}
 },

 async getUser(accessToken: string, cookies: string[]) {
   try {
     const userResponse = await apiInstance.get<UserType>('/auth/session', {
       headers: {
         Authorization: `Bearer ${accessToken}`,
         Cookie: cookies,
       },
     });
   
 
     return userResponse.data 
   } catch (error: any) {
    
     throw new Error(error.response.data.message);
   }
 },
 async logout() {
    const response= await apiInstance.post<boolean>('/auth/sign-out')
    if (response.data) removeFromStore()
        return response
 },

 
}