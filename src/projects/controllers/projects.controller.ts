import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { AccessLevel } from 'src/auth/decorators/access-level.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AccessLevelGuard } from 'src/auth/guards/access-level.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';
import { ProjectsService } from '../services/projects.service';


@Controller('projects')
@UseGuards(AuthGuard,RolesGuard,AccessLevelGuard)
export class ProjectsController {
    constructor(private readonly projectService:ProjectsService){

    }
    @Roles('CREATOR')
    @Post('create/userOwner/:userId')
    public async createProject(@Body() body:ProjectDTO,@Param('userId') userId:string){
        return await this.projectService.createProject(body,userId);
    }
    @Get('findAll')
    public async getAllProjects(){
        return this.projectService.findProjects();
    }
    @Get(':projectId')
    public async getProjectById(@Param('projectId', new ParseUUIDPipe()) id:string){
        return this.projectService.findProjectById(id);
    }
    @AccessLevel(50)
    @Put('update/:projectId')
    public async updateProject(@Param('projectId', new ParseUUIDPipe()) id:string, @Body() body:ProjectUpdateDTO){
        return await this.projectService.updateProject(id,body);
    }
    @Delete('delete/:projectId')
    public async deleteProject(@Param('projectId', new ParseUUIDPipe()) id :string){
        return await this.projectService.deleteProject(id);
    }
    
}
