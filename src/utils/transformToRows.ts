import Project from '@/interfaces/projectInterface';
import { rowDataStructure } from '@/types/search';

export function transformToRows(projects: Project[]) {
  const rowDataStructure = projects.reduce(
    (acc: rowDataStructure[], project) => {
      const { projectID, workingTimes } = project;
      const projectRows = workingTimes.map((row) => ({
        projectID,
        empID: row.empID,
        dateFrom: row.dateFrom,
        dateTo: row.dateTo,
      }));

      return [...acc, ...projectRows];
    },
    []
  );

  return rowDataStructure;
}
