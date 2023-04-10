import { BaseEntity } from "../../config/base.entity";
import { IProject } from "../interfaces/project.interface";
import { UsersProjectsEntity } from "../../users/entities/usersProjects.entity";
import { Column, Entity, OneToMany } from "typeorm";
import { TasksEntity } from "../../tasks/entities/task.entity";
@Entity({name:'projects'})
export class ProjectsEntity extends BaseEntity implements IProject{
    @Column()
    name: string;
    @Column()
    description: string;

    @OneToMany(()=>UsersProjectsEntity,(userProjects) => userProjects.project)
    usersIncludes: UsersProjectsEntity[]

    @OneToMany(()=>TasksEntity, (tasks)=>tasks.project)
    tasks:TasksEntity[]
}