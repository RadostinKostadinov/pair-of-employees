import { ProjectBased } from '@/interfaces/dataStructureInterfaces';
import { employeeBasedLongestDuration } from '@/types/search';
import calculateDuration from '@/utils/calculateDuration';
import transformToEmployees from '@/utils/transformToEmployees';
import { transformToRows } from '@/utils/transformToRows';

export default function bruteForceEmployeeBased(projects: ProjectBased[]) {
  const rows = transformToRows(projects);
  const employees = transformToEmployees(rows);

  const result: employeeBasedLongestDuration = {
    employees: [],
    duration: 0,
    projects: [],
  };

  // Employees
  for (let i = 0; i < employees.length; i++) {
    for (let j = i + 1; j < employees.length; j++) {
      // Project ID's that are already passed (used for optimization)
      const passedProjects: number[] = [];

      // Used only in result object (not necessarily)
      const matchedProjects: number[] = [];

      // Projects - Loop through every current employee(i) projects and compare it with the corresponding employee(j) projects
      for (let m = 0; m < employees[i].projects.length; m++) {
        // If the project is already passed, skip it
        if (passedProjects.includes(employees[i].projects[m].projectID)) {
          continue;
        }
        let projectDuration = 0;

        // Get all the times that the current employee(i) worked on the project
        const currentEmployeeWork = employees[i].projects.filter(
          (p) => p.projectID === employees[i].projects[m].projectID
        );

        // For each work on the project, compare with the all works of corresponding employee
        currentEmployeeWork.forEach((p) => {
          for (let n = 0; n < employees[j].projects.length; n++) {
            if (p.projectID === employees[j].projects[n].projectID) {
              const d = calculateDuration(
                p.dateFrom,
                p.dateTo,
                employees[j].projects[n].dateFrom,
                employees[j].projects[n].dateTo
              );
              projectDuration += d;
              matchedProjects.push(employees[j].projects[n].projectID);
            }
          }
        });

        passedProjects.push(employees[i].projects[m].projectID);

        if (projectDuration > result.duration) {
          result.duration = projectDuration;
          result.employees = [employees[i].empID, employees[j].empID];
          result.projects = [...new Set(matchedProjects)];
        }
      }
    }
  }

  return result;
}
