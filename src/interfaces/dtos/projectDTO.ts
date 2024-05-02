import { IsNumber, IsPositive, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';

import { ProjectWorkingTimeDTO } from './projectWorkingTimeDTO';

export class ProjectDTO {
  @IsNumber()
  @IsPositive()
  projectID: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectWorkingTimeDTO)
  workingTimes: ProjectWorkingTimeDTO[];
}
