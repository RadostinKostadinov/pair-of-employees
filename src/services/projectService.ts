import { Service } from 'typedi';

import Project, { ProjectDto } from '@/interfaces/projectInterface';

@Service()
export class ProjectService {
  private projects: Project[] = [];

  //   constructor() {}

  getAll() {
    return this.projects;
  }

  getOne(id: number) {
    return this.projects[id];
  }

  create(project: ProjectDto) {
    const found = this.projects.find((p) => p.projectID === project.projectID);

    if (found) {
      throw new Error(`Project with ID ${project.projectID} already exists`);
    }

    this.projects.push(project);
  }

  update(id: number, project: Project) {
    const selectedProject = this.projects.find((p) => p.projectID === id);

    if (!selectedProject) {
      throw new Error(`Project with ID ${id} does not exist`);
    }

    Object.assign(selectedProject, project);
  }

  delete(id: number) {
    const projectIndex = this.projects.findIndex((p) => p.projectID === id);

    if (projectIndex === -1) {
      throw new Error(`Project with ID ${id} does not exist`);
    }

    this.projects.splice(projectIndex, 1);
  }
}
