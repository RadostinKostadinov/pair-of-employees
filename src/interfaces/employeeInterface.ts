import { IsNumber, IsPositive } from 'class-validator';

export default interface Employee {
  empID: number;
  projects: number[];
}

export class EmployeeDTO {
  @IsNumber()
  @IsPositive()
  empID: number;

  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  projects: number[];
}
