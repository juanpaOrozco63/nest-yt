import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserEntity } from 'src/users/entities/user.entity';
import { IPayloadToken, ISignJWT } from '../interfaces/auth.interfaces';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService:UsersService
    ){

    }
    public async validateUser(username:string, password:string){
        const userByUsername = await this.userService
        .findBy({
            key:'username',
            value:username
        });
        const userByEmail = await this.userService
        .findBy({
            key:'email',
            value:username
        });
        if(userByUsername){
            const match = await bcrypt.compare(password,userByUsername.password)
            if(match) return userByUsername
        }        
        if(userByEmail){
            const match = await bcrypt.compare(password,userByEmail.password)
            if(match) return userByEmail
        }
    }

    public signJWT(token:ISignJWT){

        return  jwt.sign(token.payload,token.secret,{expiresIn:token.expires})
        
    }
    public async generateJWT(user:UserEntity):Promise<Object>{
        const getUser = await this.userService.findUserById(user.id);

        const payload:IPayloadToken = {
            role:getUser.role,
            sub:getUser.id
        }
        const accessToken = this.signJWT({payload,secret:process.env.JWT_SECRET,expires:'1h'})
        
        return {token:accessToken,user};
        }
    
}
