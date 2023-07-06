import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { EmployeeModule } from 'src/employee/employee.module';
import { EmployeeService } from 'src/employee/employee.service';

@Module({
    imports: [PrismaModule, EmployeeModule],
    controllers: [AuthController],
    providers: [AuthService]
})
export class UserModule {}
