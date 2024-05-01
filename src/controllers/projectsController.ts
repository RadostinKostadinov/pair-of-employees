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
  private projectServiceI = Container.get(ProjectService);

  @Get('/')
  getAll() {
    try {
      const projects = this.projectServiceI.getAll();
      return projects;
    } catch (error) {
      return 'Error occurred while getting projects';
    }
  }

  @Get('/:id')
  getOne(@Param('id') id: number) {
    try {
      const project = this.projectServiceI.getOne(id);
      return project;
    } catch (error) {
      return 'Error occurred while getting project';
    }
  }

  @Post('/')
  post(@Body({ required: true }) project: ProjectDTO) {
    try {
      this.projectServiceI.create(project);
      return 'Project saved...';
    } catch (error) {
      return 'Error occurred while saving project';
    }
  }

  @Put('/:id')
  put(@Param('id') id: number, @Body() project: ProjectDTO) {
    try {
      this.projectServiceI.update(id, project);
      return 'Project updated...';
    } catch (error) {
      return 'Error occurred while updating project';
    }
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    try {
      this.projectServiceI.delete(id);
      return 'Project removed...';
    } catch (error) {
      return 'Error occurred while deleting project';
    }
  }
}
