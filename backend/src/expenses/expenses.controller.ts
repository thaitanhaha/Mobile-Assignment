import { Controller, Get, Post, Param, Body, Delete, Put, Query } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new expense record' })
  @ApiResponse({ status: 201, description: 'Expense record created successfully.' })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get expense by ID' })
  @ApiResponse({ status: 200, description: 'Expense record retrieved successfully.' })
  getExpense(@Param('id') id: string) {
    return this.expensesService.findOne(id);
  }

  @Get('/chart')
  @ApiOperation({ summary: 'Get spending data for chart visualization' })
  @ApiResponse({ status: 200, description: 'Chart data retrieved successfully.' })
  getChart(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return this.expensesService.getChartData(startDate, endDate);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete expense by ID' })
  @ApiResponse({ status: 200, description: 'Expense record deleted successfully.' })
  remove(@Param('id') id: string) {
    return this.expensesService.remove(id);
  }
}
