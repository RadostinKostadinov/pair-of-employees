import {
  IsNumber,
  IsPositive,
  IsDateString,
  IsOptional,
} from 'class-validator';

export default interface ProjectWorkingTime {
  empID: number;
  dateFrom: string;
  dateTo?: string; // DateTo can be undefined
}

export class ProjectWorkingTimeDto {
  @IsNumber()
  @IsPositive()
  empID: number;

  @IsDateString({ strict: true })
  dateFrom: string;

  @IsOptional()
  @IsDateString({ strict: true })
  dateTo: string | undefined;
}
