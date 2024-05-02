import {
  EmployeeBased,
  csvDataStructure,
} from '@/interfaces/dataStructureInterfaces';

export default function transformToEmployees(rows: csvDataStructure[]) {
  const employees = new Map();
  rows.forEach((row) => {
    const { projectID, empID, dateFrom, dateTo } = row;
    if (!employees.has(empID)) {
      employees.set(empID, {
        empID,
        projects: [],
      });
    }
    const employee = employees.get(empID);
    employee.projects.push({
      projectID,
      dateFrom,
      dateTo,
    });
  });
  return Array.from(employees.values()) as EmployeeBased[];
}
