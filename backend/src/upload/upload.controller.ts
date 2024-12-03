import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UploadService } from './upload.service';

@Controller('upload-receipt')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiOperation({ summary: 'Upload a receipt image for OCR processing' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'Receipt image file',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Successfully processed receipt' })
  uploadReceipt(@UploadedFile() file: Express.Multer.File) {
    return this.uploadService.processFile(file);
  }
}
