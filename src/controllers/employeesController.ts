import {
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
} from 'routing-controllers';
import Container from 'typedi';

import { EmployeeService } from '@/services/employeeService';
import { EmployeeDTO } from '@/interfaces/employeeInterface';

@JsonController('/employees')
export class EmployeesController {
  private employeeServiceI = Container.get(EmployeeService);

  @Get('/')
  getAll() {
    const employees = this.employeeServiceI.getAll();
    return employees;
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    const employee = this.employeeServiceI.getOne(id);
    return employee;
  }

  @Post('/')
  post(@Body() employee: EmployeeDTO) {
    this.employeeServiceI.create(employee);
    return 'Employee saved...';
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() employee: EmployeeDTO) {
    this.employeeServiceI.update(id, employee);
    return 'Employee updated...';
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    this.employeeServiceI.delete(id);
    return 'Employee removed...';
  }
}
