import { BadRequestException, Injectable , NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs'
import { AuthService } from 'src/user/auth/auth.service';

interface UpdateEmployee {
    name?: string;
    phone?: string;
    email?: string;
    designation?: string;
    password?: string;
}

@Injectable()
export class EmployeeService {

    constructor(private readonly prismaService:PrismaService){}

    async getEmployees(){
        const employees = await this.prismaService.employee.findMany()

        return employees;
    }

    async getEmployeeById(id: number){
        const employee = await this.prismaService.employee.findUnique({
            where: {
                id,
            }
        })

        if(!employee) throw new NotFoundException({message: 'There is No Employee on this Id'})

        return employee
    }

    async updateEmployee(
        body: UpdateEmployee,
        id: number
    ){
        let data = body;
        const employee = await this.prismaService.employee.findUnique({
            where: {
                id,
            },
        });
        if (!employee) throw new NotFoundException({message: 'There is No Employee on this Id'})

        if (body.password){
            const hashedPassword = await bcrypt.hash(body.password, 10)
            const body2 = {
                ...body,
                password: hashedPassword,

            }
            data = body2
        }

        if (data.email){
            const employee = await this.getEmployeeByEmail(data.email)
            if (employee) throw new  BadRequestException({message: 'Email already exists change the email'})
        }

        if (data.phone){
            const employee = await this.getEmployeeByPhone(data.phone)
            if (employee) throw new  BadRequestException({message: 'Phone already exists change the phone'})
        }

        const updatedEmployee = await this.prismaService.employee.update({
            where: {
                id,
            },
            data: {
                ...data
            }
        })

        return updatedEmployee
    }

    async deleteEmployee(id: number){
        const employee = await this.prismaService.employee.findUnique({
            where: {
                id,
            },
        });

        if (!employee) throw new NotFoundException({message: 'There is No Employee on this Id'})

        const deletedEmployee = await this.prismaService.employee.delete({
            where: {
                id,
            }
        })

        return {deletedEmployee, delete: "Deleted Succefulyy"}
    }

    async getEmployeeByEmail(email:string){
        const employee = await this.prismaService.employee.findUnique({
            where: {
                email, 
            }
        })

        return employee
    }

    async getEmployeeByPhone(phone:string){
        const employee = await this.prismaService.employee.findUnique({
            where: {
                phone, 
            }
        })

        return employee
    }
}
