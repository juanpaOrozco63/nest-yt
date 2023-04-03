import { IsNotEmpty, IsUUID } from "class-validator";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ACCES_LEVEL, ROLES } from "src/constants/roles";
import { ProjectsEntity } from "src/projects/entities/projects.entity";
import { UserEntity } from "../entities/user.entity";

export class  UserDTO {
    @IsNotEmpty()
    @IsString()
    firstName:string;

    @IsNotEmpty()
    @IsString()
    lastName:string;

    @IsNotEmpty()
    @IsNumber()
    age:number;

    @IsNotEmpty()
    @IsString()
    email:string;

    @IsNotEmpty()
    @IsString()
    username:string;

    @IsNotEmpty()
    @IsString()
    password:string;

    @IsNotEmpty()
    @IsEnum(ROLES)
    role:ROLES;
}

export class  UserUpdateDTO {
    @IsOptional()
    @IsString()
    firstName:string;

    @IsOptional()
    @IsString()
    lastName:string;

    @IsOptional()
    @IsNumber()
    age:number;

    @IsOptional()
    @IsString()
    email:string;

    @IsOptional()
    @IsString()
    username:string;

    @IsOptional()
    @IsString()
    password:string;

    @IsOptional()
    @IsEnum(ROLES)
    role:ROLES;
}

export class UserProjectDTO {
    @IsNotEmpty()
    @IsUUID()
    user:UserEntity

    @IsNotEmpty()
    @IsUUID()
    project:ProjectsEntity

    @IsNotEmpty()
    @IsEnum(ACCES_LEVEL)
    accessLevel:ACCES_LEVEL
}