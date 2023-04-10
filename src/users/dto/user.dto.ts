import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";
import { IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { ACCES_LEVEL, ROLES } from "src/constants/roles";
import { ProjectsEntity } from "src/projects/entities/projects.entity";
import { UserEntity } from "../entities/user.entity";

export class  UserDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstName:string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    lastName:string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    age:number;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email:string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username:string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password:string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ROLES)
    role:ROLES;
}

export class  UserUpdateDTO {
    @ApiProperty()
    @IsOptional()
    @IsString()
    firstName:string;
    
    @IsOptional()
    @ApiProperty()
    @IsString()
    lastName:string;
    
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    age:number;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    email:string;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    username:string;
    
    @ApiProperty()
    @IsOptional()
    @IsString()
    password:string;
    
    @ApiProperty()
    @IsOptional()
    @IsEnum(ROLES)
    role:ROLES;
}

export class UserProjectDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    user:UserEntity
    
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    project:ProjectsEntity
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ACCES_LEVEL)
    accessLevel:ACCES_LEVEL
}