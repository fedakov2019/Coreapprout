export type UserId = number;
export type Role = "ADMIN" | "USER";

export const ROLES: Record<Role, Role> = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export type UserEntity = {
  id: UserId;
  rolesId: number;
  valueRole?: Role|null;
  login:string;

  emailVerified?: Date | null;
  name?: string | null;
  iat:number;
  exp:number;
  image?: string | null;
};

export type SessionEntity = {
  user: {
    id: UserId;
    login:string;
    rolesId: number;
    iat:number;
  exp:number;
    valueRole?: Role|null;
    name?: string | null;
    image?: string | null;
  };
  accessToken: string;
  refreshToken: string;

};