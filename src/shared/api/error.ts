import { AxiosError } from "axios";

export const errorCatch =(error:any):string=>{
    const message =error?.response?.data?.message
    return message
    ? typeof error.response.data.message==='object'
    ?message[0]
    :message
    : error.message
}
export const errorCatchax =(error:any):string=>{
    const message =error?.response?.data?.type
    return message
    ? typeof error.response.data.type==='object'
    ?message[0]
    :message
    : error.message
}