import { BaseEntity } from "../../config/base.entity";
import { ACCES_LEVEL } from "../../constants/roles";
import { ProjectsEntity } from "../../projects/entities/projects.entity";
import { Column, Entity, ManyToOne } from "typeorm";
import { UserEntity } from "./user.entity";
@Entity({name:'users_projects'})
export class UsersProjectsEntity extends BaseEntity {
    @Column({
        type:'enum',
         enum:ACCES_LEVEL
        , default:ACCES_LEVEL.MANTEINER
    })
    accessLevel :ACCES_LEVEL
    @ManyToOne(()=> UserEntity, (user)=> user.projectsIncludes)
    user:UserEntity;
    @ManyToOne(()=> ProjectsEntity,(project)=>project.usersIncludes)
    project:ProjectsEntity
}   