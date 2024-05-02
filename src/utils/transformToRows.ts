import {
  ProjectBased,
  csvDataStructure,
} from '@/interfaces/dataStructureInterfaces';

export function transformToRows(projects: ProjectBased[]) {
  const rowDataStructure = projects.reduce(
    (acc: csvDataStructure[], project) => {
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
