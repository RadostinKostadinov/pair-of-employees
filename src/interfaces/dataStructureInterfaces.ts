export interface ProjectBased {
  projectID: number;
  workingTimes: ProjectWorkingTime[];
}

export interface ProjectWorkingTime {
  empID: number;
  dateFrom: Date;
  dateTo: Date;
}

export interface EmployeeBased {
  empID: number;
  projects: EmployeeBasedProject[];
}

export interface EmployeeBasedProject {
  projectID: number;
  dateFrom: Date;
  dateTo: Date;
}
