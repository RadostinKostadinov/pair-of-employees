import { ProjectDTO } from '@/interfaces/projectInterface';
import { projectBasedLongestDuration } from '@/types/search';
import calculateDuration from '@/utils/calculateDuration';

export default function bruteForceProjectBased(projects: ProjectDTO[]) {
  const longestDuration: projectBasedLongestDuration = {
    employees: [],
    duration: 0,
    project: 0,
  };

  for (let i = 0; i < projects.length; i++) {
    for (let j = 0; j < projects[i].workingTimes.length; j++) {
      for (let k = j + 1; k < projects[i].workingTimes.length; k++) {
        const workingTime1 = projects[i].workingTimes[j];
        const workingTime2 = projects[i].workingTimes[k];
        if (
          workingTime1 &&
          workingTime2 &&
          workingTime1.empID !== workingTime2.empID
        ) {
          const duration = calculateDuration(
            workingTime1.dateFrom as Date,
            workingTime1.dateTo as Date,
            workingTime2.dateFrom as Date,
            workingTime2.dateTo as Date
          );

          if (duration > longestDuration.duration) {
            longestDuration.duration = duration;
            longestDuration.project = projects[i].projectID;
            longestDuration.employees = [
              workingTime1.empID,
              workingTime2.empID,
            ];
          }
        }
      }
    }
  }

  return longestDuration;
}
