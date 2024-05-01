import Container, { Service } from 'typedi';
import { ProjectService } from './projectService';
import updateDates from '@/utils/updateDates';
import bruteForceProjectBased from '@/utils/searchAlgorithms/projectBased/bruteForce';
import { transformToRows } from '@/utils/transformToRows';
import calculateDuration from '@/utils/calculateDuration';
import transformToEmployees from '@/utils/transformToEmployees';

@Service()
export class SearchService {
  private projectServiceI = Container.get(ProjectService);

  bruteForceSearch(projectBased = false) {
    const projectsWithDates = updateDates(
      structuredClone(this.projectServiceI.getAll())
    );

    if (projectBased) {
      const result = bruteForceProjectBased(projectsWithDates);
      return result;
    }

    const rows = transformToRows(projectsWithDates);
    const employees = transformToEmployees(rows);

    let longestDuration = 0;
    let emps: number[] = [];
    let prjcts: number[] = [];
    // Employees
    for (let i = 0; i < employees.length; i++) {
      for (let j = i + 1; j < employees.length; j++) {
        const passedProjects: number[] = [];
        const matchedProjects: number[] = [];
        // Projects
        for (let m = 0; m < employees[i].projects.length; m++) {
          if (passedProjects.includes(employees[i].projects[m].projectID)) {
            continue;
          }
          let projectDuration = 0;

          const empIProjectsM = employees[i].projects.filter(
            (p) => p.projectID === employees[i].projects[m].projectID
          );

          empIProjectsM.forEach((p) => {
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

          if (projectDuration > longestDuration) {
            longestDuration = projectDuration;
            emps = [employees[i].empID, employees[j].empID];
            prjcts = matchedProjects;
          }
        }
      }
    }

    console.log(emps, prjcts);
  }
}
