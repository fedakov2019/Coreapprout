import axios, { AxiosError, AxiosRequestConfig, type CreateAxiosDefaults } from "axios";
import { getAccessToken, removeFromStore } from "../../features/auth/auth-token.service";
import { authService } from "../../features/auth/auth.service";
import { errorCatch } from "./error";

const url = process.env.REACT_APP_HOST_URL;

const options:CreateAxiosDefaults = {
    baseURL: url,
    headers: {
        post: {
          "Content-Type": "application/json",
        },
      },
      withCredentials: true,
}

export const apiInstance = axios.create(options);
export const instanceretry = axios.create(options);

export const createInstancer = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<T> => {
  return instanceretry({
    ...config,
    ...options,
  }).then((r) => r.data);
};
export type BodyType<Data> = Data;
export type ErrorType<Error> = AxiosError<Error>;




instanceretry.interceptors.request.use((config) => {
  const accessToken= getAccessToken();  
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

instanceretry.interceptors.response.use(
  (config: any) => {
    return config;
  },
  async (error: any) => {
    const originalRequest = error.config;
    if (
      (error.response.status == 401 ||
         errorCatch(error)==='jwt expired' ||
          errorCatch(error)==='jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await authService.getNewTokens()
        return instanceretry.request(originalRequest);
      } catch (e) {
        removeFromStore();
        console.log("Не авторизован");
      }
    }
  },
);

export type ResponseTe<D = {}, Rs = ResultCode> = {
  userdata: D;
  messages: Array<string>;
  resultCode: Rs;
};
export type ResponseT<D = {}, Rs = ResultCode> = {
  UserData: D;
  messages: Array<string>;
  resultCode: Rs;
};
export enum ResultCode {
  Success = 0,
  Error = 1,
}

export type ItemT<T> = {
  items: Array<T>;
  totalCount: number;
  error: string | null;
};
