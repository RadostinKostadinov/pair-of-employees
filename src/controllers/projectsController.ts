import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  ContentType,
  JsonController,
} from 'routing-controllers';

import Container from 'typedi';
import { ProjectService } from '@/services/projectService';
import { ProjectDto } from '@/interfaces/projectInterface';

@JsonController('/projects')
export class ProjectsController {
  private serviceInstance = Container.get(ProjectService);

  @Get('/')
  getAll() {
    // Call Projects Service
    const projects = this.serviceInstance.getAll();

    return projects;
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    return `This action returns project #${id}`;
  }

  @Post('/')
  post(@Body({ required: true }) project: ProjectDto) {
    this.serviceInstance.create(project);
    return 'Saving project...';
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() project: ProjectDto) {
    this.serviceInstance.update(id, project);
    return 'Updating a project...';
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    this.serviceInstance.delete(id);
    return 'Removing project...';
  }
}
