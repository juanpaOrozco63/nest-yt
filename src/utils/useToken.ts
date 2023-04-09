import { IAuthTokenResult, IUseToken } from "src/auth/interfaces/auth.interfaces";
import * as jwt from 'jsonwebtoken';

export const useToken = (token :string):IUseToken | string  => {
    try {
        const decode = jwt.decode(token) as IAuthTokenResult;
        const currentData = new Date()
        const expiresDate = new Date(decode.exp);
        return {
            sub:decode.sub,
            role: decode.role,
            isExpired: +expiresDate <= +currentData / 1000
        }
    } catch (error) {
        return 'Token is invalid'
    }
}