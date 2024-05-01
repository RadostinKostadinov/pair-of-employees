import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from 'routing-controllers';

@Controller('/employees')
export class EmployeesController {
  @Get('/')
  getAll() {
    // Call Employees Service

    return 'This action returns all employees';
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return `This action returns employee #${id}`;
  }

  @Post('/')
  post(@Body() employee: any) {
    return 'Saving employee...';
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() employee: any) {
    return 'Updating an employee...';
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    return 'Removing employee...';
  }
}
