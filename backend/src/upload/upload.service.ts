import { Injectable } from '@nestjs/common';

@Injectable()
export class UploadService {
  processFile(file: Express.Multer.File) {
    // Xử lý file, ví dụ như gọi OCR hoặc lưu file
    return {
      message: 'Receipt uploaded successfully',
      fileName: file.originalname,
    };
  }
}
