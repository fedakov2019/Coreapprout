
import { apiInstance, instanceretry } from "../../shared/api/api-instance"
import { removeFromStore, saveTokenStore } from "./auth-token.service";
type LoginType = { accesToken: string };
type SessionToken = { accesToken: string
  refreshToken:string
 };

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
  



  async  getNewTokensmid(token: SessionToken) {
    try {

     
      const refresh = 
       await apiInstance.post<LoginType>("/auth/sign-refrech",{},{headers: {
         
            
        Authorization: `Bearer ${token.accesToken}`,
        Cookie: `refrech-token=${token.refreshToken};`,
   
      },})
      
      
      
      
  
      const newTokens = await refresh.data;
  
      
     
        //Получаем cookies из headers
        const headers = refresh.headers;
        const cookies = headers['set-cookie']! as string;
     
        //Декодируем полученный токен
     
  
        return {
          ...token,
          accesToken: newTokens.accesToken,
          refreshToken: cookies.match(/refrech-token=([^;]*)/)?.[1]!,
       
        };
      
    } catch (error) {
      console.log('Ошибка получения RefreshToken в middleware', error);
      return { ...token, error: 'ErrorRefresh' };
    }
  },
  

  async  getNewTokens(token: SessionToken) {
    try {
      const response= await apiInstance.post<LoginType>("/auth/sign-refrech",{},{headers: {
        Authorization: `Bearer ${token.accesToken}`,
        Cookie: `refrech-token=${token.refreshToken};`,
      },})
      if (response.data.accesToken) saveTokenStore(response.data.accesToken)
          
      return {
        ...token,
        accesToken: response.data.accesToken,
        refreshToken:
          response.headers['set-cookie']![0].match(
            /refrech-token=([^;]*)/,
          )?.[1]!,
      };
    } catch (error) {
      console.log('Ошибка получения RefreshToken', error);
      return { ...token, error: 'ErrorRefresh' };
    }},
 
 async main(data: IAuthForm) {
    const response = await apiInstance.post<LoginType>('/auth/sign-in',data)
    if (response.data.accesToken) saveTokenStore(response.data.accesToken)
     
        return {response, accessToken:response.data.accesToken, cookies:response.headers['set-cookie']}
 },

 async getUser(accessToken: string, cookies: string) {
   try {
     const userResponse = await apiInstance.get<UserType>('/auth/session', {
       headers: {
         Authorization: `Bearer ${accessToken}`,
         Cookie: `refrech-token=${cookies};`,
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