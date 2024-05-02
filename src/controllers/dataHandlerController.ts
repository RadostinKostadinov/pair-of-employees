import {
  Post,
  JsonController,
  UploadedFile,
  Authorized,
} from 'routing-controllers';
import Container from 'typedi';

import { csvFileUploadOptions } from '@/config/multer';
import { DataHandlerService } from '@/services/dataHandlerService';

@JsonController('/data-handler')
@Authorized()
export class dataHandlerController {
  private dataHandlerServiceI = Container.get(DataHandlerService);

  @Post('/csv')
  saveFile(
    @UploadedFile('csvFile', { options: csvFileUploadOptions() })
    file: Express.Multer.File
  ) {
    try {
      this.dataHandlerServiceI.processCsvUpload(file);
      return 'File uploaded successfully';
    } catch (error) {
      return 'File upload failed';
    }
  }
}
