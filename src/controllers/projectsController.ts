import {
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  JsonController,
} from 'routing-controllers';

import Container from 'typedi';
import { ProjectService } from '@/services/projectService';
import { ProjectDTO } from '@/interfaces/projectInterface';

@JsonController('/projects')
export class ProjectsController {
  private serviceInstance = Container.get(ProjectService);

  @Get('/')
  getAll() {
    const projects = this.serviceInstance.getAll();
    return projects;
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    const project = this.serviceInstance.getOne(id);
    return project;
  }

  @Post('/')
  post(@Body({ required: true }) project: ProjectDTO) {
    this.serviceInstance.create(project);
    return 'Project saved...';
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() project: ProjectDTO) {
    this.serviceInstance.update(id, project);
    return 'Project updated...';
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    this.serviceInstance.delete(id);
    return 'Project removed...';
  }
}
