import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectsService } from 'src/projects/services/projects.service';
import { ErrorManager } from 'src/utils/error.manager';
import { Repository } from 'typeorm';
import { TasksEntity } from '../entities/task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TasksEntity) private readonly tasksRepository:Repository<TasksEntity>,
        private readonly projectService:ProjectsService

    ){}

    public async createTask (body:any,projectId:string):Promise<TasksEntity> {
        try {
            const project = await this.projectService.findProjectById(projectId);
            if(project===undefined){
                throw new ErrorManager({
                    type:'NOT_FOUND',
                    message:'No se encontro ninguno proyecto relacionado con el id  '+ projectId
                })
            }
            return await this.tasksRepository.save({
                ...body,
                project
            })
        } catch (error) {
            throw  ErrorManager.createSignatureError(error.message)

        }
       
    }
}
