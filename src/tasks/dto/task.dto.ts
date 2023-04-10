import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { STATUS_TASK } from "src/constants/status.task";
import { ProjectDTO } from "src/projects/dto/project.dto";

export class TaskDTO {
    @IsNotEmpty()
    @IsString()
    taskName:string;

    @IsNotEmpty()
    @IsString()
    taskDescription:string;
    
    @IsEnum(STATUS_TASK)
    @IsNotEmpty()
    status:STATUS_TASK

    @IsNotEmpty()
    @IsString()
    responsableName:string;

    @IsOptional()
    project:ProjectDTO;

}