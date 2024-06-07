export type UserId = number;
export type Role = "ADMIN" | "USER";

export const ROLES: Record<Role, Role> = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export type UserEntity = {
  id: UserId;
  email?: string|null;
  valueRole?: Role|null;
  login:string;
  AccesToken:string;
  emailVerified?: Date | null;
  name?: string | null;
  image?: string | null;
};

export type SessionEntity = {
  user: {
    id: UserId;
    login:string;
    AccesToken:string;
    email?: string|null;
    valueRole?: Role|null;
    name?: string | null;
    image?: string | null;
  };
  accessToken: string;
  refreshToken: string;

};