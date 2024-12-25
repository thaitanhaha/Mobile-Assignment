import { Controller, Get, Post, Param, Body, Delete, Put, Query } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

@ApiTags('Budgets')
@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new budget record',
    description: 'Creates a new budget record using extracted data from a receipt or manual entry.',
   })
  @ApiResponse({
    status: 201,
    description: 'Budget record created successfully.',
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
    description: 'Bad request - missing or invalid budget data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async create(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetsService.create(createBudgetDto);
  }

  @Put(':budgetId')
  @ApiOperation({ summary: 'Update an budget record' })
  @ApiResponse({ status: 200, description: 'Budget record updated successfully.' })
  @ApiResponse({ status: 404, description: 'Budget record not found.' })
  async update(
    @Param('budgetId') id: string,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ) {
    return this.budgetsService.update(id, updateBudgetDto);
  }

  @Get(':budgetId')
  @ApiOperation({ summary: 'Get budget by ID',
                    description: 'Retrieve details of an budget record by its unique identifier.',
  })
  @ApiResponse({
    status: 200,
    description: 'Budget details retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        budgetId: { type: 'string', example: 'string' },
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
    description: 'Budget record not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiParam({
    name: 'budgetId',
    description: 'Unique identifier for the budget record.',
    example: '123456789', // Example of the ID parameter
  })
  async getBudget(@Param('budgetId') id: string) {
    return this.budgetsService.findOne(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all budget records',
    description: 'Retrieve all budget records stored in the database.',
  })
  @ApiResponse({
    status: 200,
    description: 'Budget records retrieved successfully.',
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
    description: 'No budget records found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getAllBudget() {
    return this.budgetsService.findAll();
  }

  @Delete(':budgetId')
  @ApiOperation({ summary: 'Delete budget by ID',
                    description: 'Deletes an budget record specified by its unique identifier.',
   })
  @ApiResponse({
    status: 200,
    description: 'Budget record deleted successfully.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Budget deleted successfully.' },
      },
    },
  })  @ApiResponse({
    status: 404,
    description: 'Budget record not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiParam({
    name: 'budgetId',
    description: 'Unique identifier for the budget record.',
    example: '123456789', // Example of the ID parameter
  })
  async remove(@Param('budgetId') id: string) {
    return this.budgetsService.remove(id);
  }
}
