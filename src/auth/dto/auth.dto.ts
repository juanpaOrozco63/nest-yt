import { IsNotEmpty, IsString } from "class-validator";
import { IAuthUser } from "../interfaces/auth.interfaces";

export class AuthDTO  implements IAuthUser{

    @IsNotEmpty()
    username:string;
    
    @IsNotEmpty()
    @IsString()
    password:string;
}