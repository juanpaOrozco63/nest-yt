import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorManager } from 'src/utils/error.manager';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserDTO, UserProjectDTO, UserUpdateDTO } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';
import { UsersProjectsEntity } from '../entities/usersProjects.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(UserEntity) private readonly userRepository:Repository<UserEntity>,
        @InjectRepository(UsersProjectsEntity) private readonly UserProjectRepository:Repository<UsersProjectsEntity>)
        {
            
        }
    public async createUser(body:UserDTO):Promise<UserEntity>{
        try {
            return await this.userRepository.save(body); 
        } catch (error) {
            throw  ErrorManager.createSignatureError(error.message)
        }
    }
    public async findUsers():Promise<UserEntity[]>{
        try {
            const users:UserEntity[] = await this.userRepository.find(); 
            if(users.length === 0){
                throw new ErrorManager({
                    type:'BAD_REQUEST',
                    message:'No se encontro resultados'
                })
            }
            return users;
        } catch (error) {
        throw  ErrorManager.createSignatureError(error.message)
        }
    }
    public async findUserById(id:string):Promise<UserEntity>{
        try {
            const user:UserEntity = await this.userRepository
            .createQueryBuilder('user')
            .where({id})
            .leftJoinAndSelect('user.projectsIncludes','projectsIncludes')
            .leftJoinAndSelect('projectsIncludes.project','project')
            .getOne(); 
            if(!user){
                throw new ErrorManager({
                    type:'BAD_REQUEST',
                    message:'No se encontro ninguno usuario con el id '+ id
                })
            }
            return user
        } catch (error) {
            throw  ErrorManager.createSignatureError(error.message)
        }
    }
    public async updateUser(body:UserUpdateDTO,id:string):Promise<UpdateResult | undefined>{
        try {
            const user:UpdateResult = await this.userRepository.update(id,body)
            if(user.affected === 0 ){
                throw new ErrorManager({
                    type:'BAD_REQUEST',
                    message:'No se pudo actualizar'
                })
            }
            return user;
        } catch (error) {
            throw  ErrorManager.createSignatureError(error.message)
        }
    }
    public async deleteUser(id:string):Promise<DeleteResult | undefined>{
        try {
            const user:DeleteResult = await this.userRepository.delete(id)
            if(user.affected === 0 ){
                throw new ErrorManager({
                    type:'BAD_REQUEST',
                    message:'No se pudo borrar'
                })
            }
            return user;
        } catch (error) {
            throw  ErrorManager.createSignatureError(error.message)
        }
    }
    // SERVICES RELATION USERS ANDA PROJECTS ENDPONIT
    public async createUserToProject(body:UserProjectDTO):Promise<UsersProjectsEntity>{
        try {
            return await this.UserProjectRepository.save(body); 
        } catch (error) {
            throw  ErrorManager.createSignatureError(error.message)
 
        }
    }
    
}
