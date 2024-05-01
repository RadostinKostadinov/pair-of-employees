import { ProjectBased } from '@/interfaces/dataStructureInterfaces';
import { ProjectDTO } from '@/interfaces/projectInterface';

export default function updateDates(projects: ProjectDTO[]) {
  return projects.map((p) => ({
    projectID: p.projectID,
    workingTimes: p.workingTimes.map((workingTime) => ({
      empID: workingTime.empID,
      dateFrom: new Date(workingTime.dateFrom),
      dateTo: workingTime.dateTo
        ? new Date(workingTime.dateTo)
        : new Date(new Date().setUTCHours(0, 0, 0, 0)),
    })),
  })) as ProjectBased[];
}
