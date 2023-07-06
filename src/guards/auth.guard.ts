import {CanActivate, Injectable, ExecutionContext, UnauthorizedException} from '@nestjs/common'
import { User, UserInfoDecorator } from 'src/user/decorators/user.decorator'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class AuthGuard implements CanActivate {

    async canActivate(context: ExecutionContext){
        const request = context.switchToHttp().getRequest()
        const token = request.headers?.authorization?.split(" ")[1]
        if (!token) throw new UnauthorizedException({message: 'Required JWT Token'})
        const isValidEmployee = jwt.verify(token, "MY_SECRET_TOKEN") 
        if(isValidEmployee) return true 
        return false
    }
}