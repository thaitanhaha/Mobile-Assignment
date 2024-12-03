declare namespace Express {
    export interface Multer {
      File: {
        originalname: string;
        filename: string;
        path: string;
        size: number;
        mimetype: string;
      };
    }
  }
  