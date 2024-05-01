import { IsNumber, IsPositive, ValidateNested, IsArray } from 'class-validator';

import { Type } from 'class-transformer';

import ProjectWorkingTime, {
  ProjectWorkingTimeDto,
} from './projectWorkingTimesInterface';

export default interface Project {
  projectID: number;
  workingTimes: ProjectWorkingTime[];
}

export class ProjectDto {
  @IsNumber()
  @IsPositive()
  projectID: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProjectWorkingTimeDto)
  workingTimes: ProjectWorkingTimeDto[];
}
