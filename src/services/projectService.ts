import { Service } from 'typedi';

import Project, { ProjectDTO } from '@/interfaces/projectInterface';

@Service()
export class ProjectService {
  private projects: Project[] = [];

  getAll() {
    return this.projects;
  }

  getOne(id: number) {
    const projectIndex = this.projects.findIndex((p) => p.projectID === id);

    if (projectIndex === -1) {
      throw new Error(`Project with ID ${id} does not exist`);
    }

    return this.projects[projectIndex];
  }

  create(project: ProjectDTO) {
    const found = this.projects.find((p) => p.projectID === project.projectID);

    if (found) {
      throw new Error(`Project with ID ${project.projectID} already exists`);
    }

    // TODO: Update Employees
    this.projects.push(project);
  }

  update(id: number, project: Project) {
    const selectedProject = this.projects.find((p) => p.projectID === id);

    if (!selectedProject) {
      throw new Error(`Project with ID ${id} does not exist`);
    }

    // TODO: Update Employees
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
