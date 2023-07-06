import { Controller , Get, Delete, Put, UseGuards, Param, ParseIntPipe, UnauthorizedException, Body} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { User, UserInfoDecorator } from 'src/user/decorators/user.decorator';
import { EmployeeService } from './employee.service';
import { UpdateEmployeeDto } from 'src/user/dtos/employee.dto';

@Controller('employee')
export class EmployeeController {

    constructor(private readonly employeeService:EmployeeService){}

    @Get()
    @UseGuards(AuthGuard)
    getEmployees(
        @User() user: UserInfoDecorator
    ){
         return this.employeeService.getEmployees();
    }


    @Get('/:id')
    @UseGuards(AuthGuard)
    getEmployeeById(
        @Param('id') id: number
    ){
        return this.employeeService.getEmployeeById(id)
    }

    @Put('/:id')
    async updateEmployeeById(
        @Param('id', ParseIntPipe) id:number,
        @User() user: UserInfoDecorator,
        @Body() body: UpdateEmployeeDto
    ){
        const employee = await this.employeeService.getEmployeeById(id)

        if (employee.id !== user.id) throw new UnauthorizedException()
        return this.employeeService.updateEmployee(body, id);
    }

    @Delete('/:id')
    async deleteEmployeeById(
        @Param('id', ParseIntPipe) id: number,
        @User() user: UserInfoDecorator
    ){
        const employee = await this.employeeService.getEmployeeById(id)

        if(employee.id !== user.id) throw new UnauthorizedException()
        return this.employeeService.deleteEmployee(id)
    }
}
