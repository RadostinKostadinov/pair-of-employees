import Container, { Service } from 'typedi';
import { ProjectService } from './projectService';
import updateDates from '@/utils/updateDates';
import bruteForceProjectBased from '@/utils/searchAlgorithms/projectBased/bruteForce';
import bruteForceEmployeeBased from '@/utils/searchAlgorithms/employeeBased/bruteForce';

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

    const result = bruteForceEmployeeBased(projectsWithDates);
    return result;
  }
}
