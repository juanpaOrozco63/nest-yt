import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';
import { ProjectsEntity } from '../entities/projects.entity';

@Injectable()
export class ProjectsService {

    constructor(@InjectRepository(ProjectsEntity) private readonly projectRepository:Repository<ProjectsEntity> ){

    }
    public async createProject(body:ProjectDTO):Promise<ProjectsEntity>{
        try {
            return await this.projectRepository.save(body);
        } catch (error) {
            throw  ErrorManager.createSignatureError(error.message)
        }
    }
    public async findProjects():Promise<ProjectsEntity[]>{
        try {
            const projects:ProjectsEntity[] = await this.projectRepository.find();
            if(projects.length === 0){
                throw new ErrorManager({
                    type:'BAD_REQUEST',
                    message:'No se encontro resultados'
                })
            }
            return projects
        } catch (error) {
            throw  ErrorManager.createSignatureError(error.message)

        }
    }
   public async findProjectById(id:string):Promise<ProjectsEntity>{
    try {
        const project:ProjectsEntity = await this.projectRepository
        .createQueryBuilder('project')
        .where({id})
        .leftJoinAndSelect('project.usersIncludes','usersIncludes')
        .leftJoinAndSelect('usersIncludes.user','user')
        .getOne();
        if(!project){
            throw new ErrorManager({
                type:'BAD_REQUEST',
                message:'No se encontro ninguno projecto con el id '+ id
            })
        }
        return project
    } catch (error) {
        throw  ErrorManager.createSignatureError(error.message)

    }
   }
   public async updateProject(id:string,body:ProjectUpdateDTO):Promise<UpdateResult | undefined>{
    try {
        const project:UpdateResult = await this.projectRepository.update(id,body);
        if(project.affected === 0){
            throw new ErrorManager({
                type:'BAD_REQUEST',
                message:'No se pudo actualizar'
            })
        }
        return project;
    } catch (error) {
        throw  ErrorManager.createSignatureError(error.message)

    }
   }
   public async deleteProject(id:string):Promise<DeleteResult| undefined>{
    try {
        const project:DeleteResult = await this.projectRepository.delete(id);
        if(project.affected === 0){
            throw new ErrorManager({
                type:'BAD_REQUEST',
                message:'No se pudo borrar'
            })
        }
        return project;
    } catch (error) {
        throw  ErrorManager.createSignatureError(error.message)

    }
   }
}
