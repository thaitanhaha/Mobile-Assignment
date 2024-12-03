import { Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  private expenses = [];  //

  create(createExpenseDto: CreateExpenseDto) {
    const newExpense = { id: Date.now().toString(), ...createExpenseDto };
    this.expenses.push(newExpense);
    return newExpense;
  }

  findOne(id: string) {
    return this.expenses.find(expense => expense.id === id);
  }

  getChartData(startDate: string, endDate: string, groupBy: string) {
    // Mock data cho biểu đồ
    return {
      startDate,
      endDate,
      groupBy: 'month',
      dataPoints: [
        { label: 'January', totalAmount: 500 },
        { label: 'February', totalAmount: 800 },
      ],
    };
  }

  remove(id: string) {
    this.expenses = this.expenses.filter(expense => expense.id !== id);
    return { message: 'Expense deleted successfully' };
  }
}
