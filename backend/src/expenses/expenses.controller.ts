import { Controller, Get, Post, Param, Body, Delete, Put, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { GetChartQueryDto } from './dto/get-chart-query.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam, ApiQuery } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';

@ApiTags('Expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new expense record',
    description: 'Creates a new expense record using extracted data from a receipt or manual entry.',
   })
  @ApiResponse({
    status: 201,
    description: 'Expense record created successfully.',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: '12345678', // Example ID
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - missing or invalid expense data.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Put(':expenseId')
  @ApiOperation({ summary: 'Update an expense record' })
  @ApiResponse({ status: 200, description: 'Expense record updated successfully.' })
  @ApiResponse({ status: 404, description: 'Expense record not found.' })
  async update(
    @Param('expenseId') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.expensesService.update(id, updateExpenseDto);
  }

  @Get(':expenseId')
  @ApiOperation({ summary: 'Get expense by ID',
                    description: 'Retrieve details of an expense record by its unique identifier.',
  })
  @ApiResponse({
    status: 200,
    description: 'Expense details retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        expenseId: { type: 'string', example: 'string' },
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
    description: 'Expense record not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiParam({
    name: 'expenseId',
    description: 'Unique identifier for the expense record.',
    example: '123456789', // Example of the ID parameter
  })
  async getExpense(@Param('expenseId') id: string) {
    return this.expensesService.findOne(id);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all expense records',
    description: 'Retrieve all expense records stored in the database.',
  })
  @ApiResponse({
    status: 200,
    description: 'Expense records retrieved successfully.',
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
    description: 'No expense records found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  async getAllExpense() {
    return this.expensesService.findAll();
  }

  @Get('/chart')
  @ApiOperation({
    summary: 'Get spending data for chart visualization',
    description:
      'This endpoint lets you get data to create a spending chart. It helps users see their spending patterns over time, like total spent each month or breakdown by category.',
  })
  @ApiResponse({
    status: 200,
    description: 'Chart data retrieved successfully.',
    schema: {
      type: 'object',
      properties: {
        startDate: { type: 'string', format: 'date', example: '2024-12-03' },
        endDate: { type: 'string', format: 'date', example: '2024-12-03' },
        groupBy: { type: 'string', example: 'month' },
        dataPoints: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              label: { type: 'string', example: 'January' },
              totalAmount: { type: 'number', example: 0 },
            },
          },
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - missing or invalid parameters.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiQuery({
    name: 'startDate',
    description: 'The start date for the data range (e.g., "2024-01-01").',
    required: true,
    type: String,
    format: 'date',  // This indicates that it's a date string (ISO 8601 format)
    example: '2024-01-01',
  })
  @ApiQuery({
    name: 'endDate',
    description: 'The end date for the data range (e.g., "2024-12-31").',
    required: true,
    type: String,
    format: 'date',  // This indicates that it's a date string (ISO 8601 format)
    example: '2024-12-31',
  })
  @ApiQuery({
    name: 'groupBy',
    description: 'How to group the data. Choose "month" to see spending by month or "category" to see a breakdown by category.',
    required: false,
    type: String,
    enum: ['month', 'category'],  // Defines the valid values for groupBy
    example: 'month',
  })
  async getChart(@Query() query: GetChartQueryDto) {
    const { startDate, endDate, groupBy } = query;
    return this.expensesService.getChartData(startDate, endDate, groupBy);
  }

  @Delete(':expenseId')
  @ApiOperation({ summary: 'Delete expense by ID',
                    description: 'Deletes an expense record specified by its unique identifier.',
   })
  @ApiResponse({
    status: 200,
    description: 'Expense record deleted successfully.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Expense deleted successfully.' },
      },
    },
  })  @ApiResponse({
    status: 404,
    description: 'Expense record not found.',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
  })
  @ApiParam({
    name: 'expenseId',
    description: 'Unique identifier for the expense record.',
    example: '123456789', // Example of the ID parameter
  })
  async remove(@Param('expenseId') id: string) {
    return this.expensesService.remove(id);
  }
}
