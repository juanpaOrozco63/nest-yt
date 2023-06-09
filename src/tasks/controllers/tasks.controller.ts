import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { TaskDTO } from '../dto/task.dto';
import { TasksService } from '../services/tasks.service';
@ApiTags('Tasks')

@Controller('tasks')
@UseGuards(AuthGuard,RolesGuard,AccessLevelGuard)
export class TasksController {
    constructor(private readonly taskService:TasksService){

    }
    @Post('create/:projectId')
    public async createTask(@Body() body:TaskDTO, @Param('projectId') projectId:string){
        return  this.taskService.createTask(body,projectId);
    }
    @Get('findAll/:taskId')
    public async getTaskById(@Param('taskId') taskId :string){
        return this.taskService.findTaskById(taskId);
    }
}
