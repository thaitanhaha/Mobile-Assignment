import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { UploadService } from './upload.service';

@Controller('upload-receipt')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

//   @Post()
//   @ApiOperation({ summary: 'Upload a receipt image for OCR processing' })
//   @ApiConsumes('multipart/form-data')
//   @ApiBody({
//     schema: {
//       type: 'object',
//       properties: {
//         file: {
//           type: 'string',
//           format: 'binary',
//           description: 'Receipt image file',
//         },
//       },
//     },
//   })
//   @ApiResponse({ status: 200, description: 'Successfully processed receipt' })
//   uploadReceipt(@UploadedFile() file: Express.Multer.File) {
//     return this.uploadService.processFile(file);
//   }
@Post()
@ApiOperation({ summary: 'Upload a receipt image for OCR processing',
                description: 'Receives an image of a receipt, extracts expense information, and returns parsed data.',

 })
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
@ApiResponse({
  status: 201,
  description: 'Successfully processed receipt',
  schema: {
    type: 'object',
    properties: {
      id: { type: 'string', example: 'string' },
      totalAmount: { type: 'number', example: 0 },
      date: { type: 'string', format: 'date', example: '2024-12-03' },
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string', example: 'string' },
            amount: { type: 'number', example: 0 },
            price: { type: 'number', example: 0 },
            totalPrice: { type: 'number', example: 0 },
          },
        },
      },
    },
  },
})
@ApiResponse({
  status: 400,
  description: 'Bad request - invalid image format or missing file.',
})
@ApiResponse({
  status: 500,
  description: 'Internal server error.',
})
@UseInterceptors(FileInterceptor('file'))
uploadReceipt(@UploadedFile() file: Express.Multer.File) {
  return this.uploadService.processFile(file);
}
}
