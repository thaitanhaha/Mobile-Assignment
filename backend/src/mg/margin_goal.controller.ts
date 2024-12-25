import { Controller, Get, Post, Param, Body, Delete, Put, Query } from '@nestjs/common';
import { MGsService } from './margin_goal.service';
import { CreateMGDto } from './dto/create-margin_goal.dto';
import { UpdateMGDto } from './dto/update-margin_goal.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

@ApiTags('MG')
@Controller('mgs')
export class MGsController {
  constructor(private readonly mgsService: MGsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new margin/goal record',
    description: 'Creates a new margin/goal record using extracted data from a receipt or manual entry.',
   })
  @ApiResponse({
    status: 201,
    description: 'MG record created successfully.',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '12345678',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - missing or invalid margin/goal data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async create(@Body() createMGDto: CreateMGDto) {
    return this.mgsService.create(createMGDto);
  }

  @Put(':mgId')
  @ApiOperation({ summary: 'Update an margin/goal record' })
  @ApiResponse({ status: 200, description: 'MG record updated successfully.' })
  @ApiResponse({ status: 404, description: 'MG record not found.' })
  async update(
    @Param('mgId') id: string,
    @Body() updateMGDto: UpdateMGDto,
  ) {
    return this.mgsService.update(id, updateMGDto);
  }

  @Get(':mgId')
  @ApiOperation({ summary: 'Get margin/goal by ID',
                    description: 'Retrieve details of an margin/goal record by its unique identifier.',
  })
  @ApiResponse({
    status: 200,
    description: 'MG details retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        mgId: { type: 'string', example: 'string' },
        totalAmount: { type: 'number', example: 0 },
        date: { type: 'string', format: 'date', example: '2024-12-03' },
        category: { type: 'string', example: 'string' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', example: 'string' },
              price: { type: 'number', example: 0 },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'MG record not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiParam({
    name: 'mgId',
    description: 'Unique identifier for the margin/goal record.',
    example: '123456789', // Example of the ID parameter
  })
  async getMG(@Param('mgId') id: string) {
    return this.mgsService.findOne(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all margin/goal records',
    description: 'Retrieve all margin/goal records stored in the database.',
  })
  @ApiResponse({
    status: 200,
    description: 'MG records retrieved successfully.',
    schema: {
      type: 'array', // Vì trả về danh sách, nên type là array
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', example: '123456789' },
          totalAmount: { type: 'number', example: 100.5 },
          date: { type: 'string', format: 'date', example: '2024-12-03' },
          category: { type: 'string', example: 'Food' },
          items: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string', example: 'Pizza' },
                price: { type: 'number', example: 12.5 },
              },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'No margin/goal records found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getAllMG() {
    return this.mgsService.findAll();
  }

  @Delete(':mgId')
  @ApiOperation({ summary: 'Delete margin/goal by ID',
                    description: 'Deletes an margin/goal record specified by its unique identifier.',
   })
  @ApiResponse({
    status: 200,
    description: 'MG record deleted successfully.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'MG deleted successfully.' },
      },
    },
  })  @ApiResponse({
    status: 404,
    description: 'MG record not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiParam({
    name: 'mgId',
    description: 'Unique identifier for the margin_goal record.',
    example: '123456789', // Example of the ID parameter
  })
  async remove(@Param('mgId') id: string) {
    return this.mgsService.remove(id);
  }
}
