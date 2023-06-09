import { ROLES } from "src/constants/roles";
import * as jwt from 'jsonwebtoken';

export interface IPayloadToken {
    sub:string;
    role:ROLES;
}
export interface ISignJWT {
    payload:jwt.JwtPayload;
    secret:string;
    expires:number | string;
}
export interface IAuthUser {
    username:string;
     password:string
}
export interface IAuthTokenResult{
    role:string;
    sub:string;
    iat:number;
    exp:number;
}
export interface IUseToken {
    role:string;
    sub:string;
    isExpired:boolean;
}