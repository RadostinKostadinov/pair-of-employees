import { IsNumber, IsPositive } from 'class-validator';

export class EmployeeDTO {
  @IsNumber()
  @IsPositive()
  empID: number;

  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  projects: number[];
}
