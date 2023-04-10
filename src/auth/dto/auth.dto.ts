import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { IAuthUser } from "../interfaces/auth.interfaces";

export class AuthDTO  implements IAuthUser{
    @ApiProperty()
    @IsNotEmpty()
    username:string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password:string;
}