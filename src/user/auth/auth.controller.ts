import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto, SigninDto } from '../dtos/employee.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Post('/signup')
    createEmployee(
        @Body() body: SignupDto
        ) {
        
            return this.authService.signup(body)
    }

    @Post('/signin')
    signin(
        @Body() body: SigninDto
    ){
        return this.authService.signin(body)
    }
}
