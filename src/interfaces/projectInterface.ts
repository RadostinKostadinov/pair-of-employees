import { IsNumber, IsPositive, ValidateNested, IsArray } from 'class-validator';

import { Type } from 'class-transformer';

import ProjectWorkingTime, {
  ProjectWorkingTimeDTO,
} from './projectWorkingTimesInterface';

export default interface Project {
  projectID: number;
  workingTimes: ProjectWorkingTime[];
}

export class ProjectDTO {
  @IsNumber()
  @IsPositive()
  projectID: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectWorkingTimeDTO)
  workingTimes: ProjectWorkingTimeDTO[];
}
