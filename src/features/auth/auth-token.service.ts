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
    Cookies.set(EnumTokens.ACCESS_TOKEN,accessToken,{
        domain:url,
        sameSite: 'Strict',
        expires:1
    })
}
export const removeFromStore = () =>{
    Cookies.remove(EnumTokens.ACCESS_TOKEN)
}