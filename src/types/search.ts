export type projectBasedLongestDuration = {
  employees: number[];
  duration: number;
  project: number;
};

export type employeesBasedLongestDuration = {
  employees: number[];
  duration: number;
  projects: number[];
};

// csv-like, data structure
export type rowDataStructure = {
  projectID: number;
  empID: number;
  dateFrom: Date;
  dateTo: Date;
};
