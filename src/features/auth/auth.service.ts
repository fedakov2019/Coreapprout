import { apiInstance } from "../../shared/api/api-instance"
import { removeFromStore, saveTokenStore } from "./auth-token.service";
type LoginType = { accesToken: string };
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
        return response
 },
 async logout() {
    const response= await apiInstance.post<boolean>('/auth/sign-out')
    if (response.data) removeFromStore()
        return response
 }

}