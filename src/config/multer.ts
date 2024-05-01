import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const csvFileUploadOptions = () => ({
  storage: multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: DestinationCallback
    ) => cb(null, './uploads/csv'),

    filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback) =>
      cb(null, `dataHandler_${Date.now()}_${file.originalname}`),
  }),
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
  ) => {
    if (file.mimetype !== 'text/csv') {
      return cb(new Error('Only CSV files are allowed'));
    }
    cb(null, true);
  },
  limits: {
    fieldNameSize: 255,
    fileSize: 1024 * 1024 * 5, // 5 MB
  },
});
