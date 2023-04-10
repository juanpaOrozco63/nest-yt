import { Body, Controller, Get, Post } from '@nestjs/common';
import { Delete, Param, Put, UseGuards } from '@nestjs/common/decorators';
import { AdminAccess } from 'src/auth/decorators/admin.decorator';
import { PublicAccess } from 'src/auth/decorators/public.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
    constructor(
        private readonly usersService:UsersService){

    }

    @Post('createUser')
    public async createUser(@Body() body:UserDTO){
        return await this.usersService.createUser(body);
    }
    @AdminAccess()
    @Get('findAll')
    public async findAllUsers(){
        return await this.usersService.findUsers();
    }
    @PublicAccess()
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
