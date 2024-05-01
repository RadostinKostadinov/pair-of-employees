import { EmployeeBased } from '@/interfaces/dataStructureInterfaces';
import { rowDataStructure } from '@/types/search';

export default function transformToEmployees(rows: rowDataStructure[]) {
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
