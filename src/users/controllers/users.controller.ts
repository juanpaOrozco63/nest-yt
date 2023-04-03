import { Body, Controller, Get, Post } from '@nestjs/common';
import { Delete, Param, Put } from '@nestjs/common/decorators';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService:UsersService){

    }

    @Post('createUser')
    public async createUser(@Body() body:UserDTO){
        return await this.usersService.createUser(body);
    }
    @Get('findAll')
    public async findAllUsers(){
        return await this.usersService.findUsers();
    }
    
    @Get(':id')
    public async findUserById(@Param('id') id:string){
        return await this.usersService.findUserById(id);
    }
    @Put('update/:id')
    public async updateUser(@Param('id') id:string, @Body() body:UserUpdateDTO){
        return await this.usersService.updateUser(body,id);
    }
    @Delete('delete/:id')
    public async deleteUser(@Param('id') id:string){
        return await this.usersService.deleteUser(id);
    }
    // RELATION USERS ANDA PROJECTS ENDPONIT
    @Post('createUserToProject')
    public async createUserToProject(@Body() body:any){
        return await this.usersService.createUserToProject(body);
    }
}
