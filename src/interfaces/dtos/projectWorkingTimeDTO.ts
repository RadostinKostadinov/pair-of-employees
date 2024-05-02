import {
  IsNumber,
  IsPositive,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class ProjectWorkingTimeDTO {
  @IsNumber()
  @IsPositive()
  empID: number;

  @IsDateString({ strict: true })
  dateFrom: string | Date;

  @IsOptional()
  @IsDateString({ strict: true })
  dateTo: string | Date | undefined;
}
