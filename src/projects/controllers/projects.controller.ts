import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectDTO, ProjectUpdateDTO } from '../dto/project.dto';
import { ProjectsService } from '../services/projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectService:ProjectsService){

    }
    @Post('createProject')
    public async createProject(@Body() body:ProjectDTO){
        return await this.projectService.createProject(body);
    }
    @Get('findAll')
    public async getAllProjects(){
        return this.projectService.findProjects();
    }
    @Get(':id')
    public async getProjectById(@Param('id') id:string){
        return this.projectService.findProjectById(id);
    }
    @Put('update/:id')
    public async updateProject(@Param() id:string, @Body() body:ProjectUpdateDTO){
        return await this.projectService.updateProject(id,body);
    }
    @Delete('delete/:id')
    public async deleteProject(@Param() id :string){
        return await this.projectService.deleteProject(id);
    }
    
}
