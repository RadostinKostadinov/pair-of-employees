import Container, { Service } from 'typedi';

import { ProjectDTO } from '@/interfaces/dtos/projectDTO';
import { EmployeeService } from './employeeService';

@Service()
export class ProjectService {
  private projects: ProjectDTO[] = [];

  private employeeServiceI = Container.get(EmployeeService);

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

    // Update employees
    project.workingTimes.forEach((pwt) => {
      try {
        this.employeeServiceI.assignEmployeeToProject(
          pwt.empID,
          project.projectID
        );
      } catch (error) {
        this.employeeServiceI.create({
          empID: pwt.empID,
          projects: [project.projectID],
        });
      }
    });

    this.projects.push(project);
  }

  update(id: number, project: ProjectDTO) {
    const selectedProject = this.projects.find((p) => p.projectID === id);

    if (!selectedProject) {
      throw new Error(`Project with ID ${id} does not exist`);
    }

    // TODO: Update employees
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
