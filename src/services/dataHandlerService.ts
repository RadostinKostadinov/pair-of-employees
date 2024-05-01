import Container, { Service } from 'typedi';
import csvParser from 'csv-parser';
import fs from 'fs';
import path from 'path';
import { ProjectDTO } from '@/interfaces/projectInterface';
import { ProjectService } from './projectService';

@Service()
export class DataHandlerService {
  private projectServiceI = Container.get(ProjectService);

  processCsvUpload(file: Express.Multer.File) {
    const filePath = path.join(process.cwd(), file.destination, file.filename);

    fs.createReadStream(filePath)
      .pipe(
        csvParser({ headers: ['EmpID', 'ProjectID', 'DateFrom', 'DateTo'] })
      )
      .on('data', (row) => {
        const project: ProjectDTO = {
          projectID: parseInt(row.ProjectID),
          workingTimes: [
            {
              empID: parseInt(row.EmpID),
              dateFrom: row.DateFrom,
              dateTo: row.DateTo ? row.DateTo : undefined,
            },
          ],
        };

        try {
          this.projectServiceI.create(project);
        } catch (err: any) {
          if (err.message.includes('already exists')) {
            const existingProject = this.projectServiceI.getOne(
              project.projectID
            );
            existingProject.workingTimes.push(project.workingTimes[0]);
          }
        }
      })
      .on('end', () => {
        // Data loaded successfully, do further processing here if needed
      })
      .on('error', () => {
        // Error occurred while reading CSV
      });
  }
}
