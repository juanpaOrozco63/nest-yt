import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDTO } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';
@ApiTags('Auth')

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService:AuthService
    ){

    }
    @Post('login')
    public async login(@Body() body :AuthDTO){
        const userValidate = await this.authService.validateUser(body.username,body.password);

        if(!userValidate){
            throw new UnauthorizedException('Data not valid');
        }
        const jwt = await this.authService.generateJWT(userValidate);
        
        return jwt;
    }
}
