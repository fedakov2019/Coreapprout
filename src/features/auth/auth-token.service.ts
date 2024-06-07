
import Cookies from 'js-cookie'
export enum EnumTokens {
    'ACCESS_TOKEN'= 'accessToken',
    'REFRESH_TOKEN'='refreshToken'
}
export const getAccessToken =()=>{
    const accessToken =Cookies.get(EnumTokens.ACCESS_TOKEN)
    return accessToken || null
}
const url = process.env.HOST_LOCAL;
export const saveTokenStore =(accessToken:string)=>{
    const date = new Date(Date.now() + 7200e3);
    Cookies.set(EnumTokens.ACCESS_TOKEN,accessToken,{
        domain:url,
        sameSite: 'Strict',
        expires: date
        
    })
}
export const removeFromStore = () =>{
    Cookies.remove(EnumTokens.ACCESS_TOKEN)
}