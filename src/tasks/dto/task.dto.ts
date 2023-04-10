import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { STATUS_TASK } from "src/constants/status.task";
import { ProjectDTO } from "src/projects/dto/project.dto";

export class TaskDTO {
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    taskName:string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    taskDescription:string;
    
    @ApiProperty()
    @IsEnum(STATUS_TASK)
    @IsNotEmpty()
    status:STATUS_TASK

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    responsableName:string;
    
    @ApiProperty()
    @IsOptional()
    project:ProjectDTO;

}