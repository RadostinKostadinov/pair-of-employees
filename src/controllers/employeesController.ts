import {
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  Authorized,
} from 'routing-controllers';
import Container from 'typedi';

import { EmployeeService } from '@/services/employeeService';
import { EmployeeDTO } from '@/interfaces/dtos/employeeDTO';

@JsonController('/employees')
@Authorized()
export class EmployeesController {
  private employeeServiceI = Container.get(EmployeeService);

  @Get('/')
  getAll() {
    try {
      const employees = this.employeeServiceI.getAll();
      return employees;
    } catch (error) {
      return 'Error occurred while getting employees';
    }
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    try {
      const employee = this.employeeServiceI.getOne(id);
      return employee;
    } catch (error) {
      return 'Error occurred while getting employee';
    }
  }

  @Post('/')
  post(@Body() employee: EmployeeDTO) {
    try {
      this.employeeServiceI.create(employee);
      return 'Employee saved...';
    } catch (error) {
      return 'Error occurred while saving employee';
    }
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() employee: EmployeeDTO) {
    try {
      this.employeeServiceI.update(id, employee);
      return 'Employee updated...';
    } catch (error) {
      return 'Error occurred while updating employee';
    }
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    try {
      this.employeeServiceI.delete(id);
      return 'Employee removed...';
    } catch (error) {
      return 'Error occurred while removing employee';
    }
  }
}
