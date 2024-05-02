import { Service } from 'typedi';

import { EmployeeDTO } from '@/interfaces/dtos/employeeDTO';

@Service()
export class EmployeeService {
  private employees: EmployeeDTO[] = [];

  getAll() {
    return this.employees;
  }

  getOne(id: number) {
    const employeeIndex = this.employees.findIndex((e) => e.empID === id);

    if (employeeIndex === -1) {
      throw new Error(`Employee with ID ${id} does not exist`);
    }

    return this.employees[employeeIndex];
  }

  create(employee: EmployeeDTO) {
    const found = this.employees.find((e) => e.empID === employee.empID);

    if (found) {
      throw new Error(`Employee with ID ${employee.empID} already exists`);
    }

    this.employees.push(employee);
  }

  update(id: number, employee: EmployeeDTO) {
    const selectedEmployee = this.employees.find((e) => e.empID === id);

    if (!selectedEmployee) {
      throw new Error(`Employee with ID ${id} does not exist`);
    }

    Object.assign(selectedEmployee, employee);
  }

  delete(id: number) {
    const employeeIndex = this.employees.findIndex((e) => e.empID === id);

    if (employeeIndex === -1) {
      throw new Error(`Employee with ID ${id} does not exist`);
    }

    this.employees.splice(employeeIndex, 1);
  }

  isEmployeeExist(id: number) {
    return this.employees.some((e) => e.empID === id);
  }

  assignEmployeeToProject(empID: number, projectID: number) {
    const employeeIndex = this.employees.findIndex((e) => e.empID === empID);

    if (employeeIndex === -1) {
      throw new Error(`Employee with ID ${empID} does not exist`);
    }

    const projectIndex = this.employees[employeeIndex].projects.findIndex(
      (p) => p === projectID
    );

    if (projectIndex === -1) {
      this.employees[employeeIndex].projects.push(projectID);
    }
  }
}
