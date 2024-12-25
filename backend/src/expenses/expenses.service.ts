import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from './schemas/expenses.schema';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectModel(Expense.name) private readonly expenseModel: Model<Expense>,
  ) {}

  // Tạo mới Expense
  async create(createExpenseDto: CreateExpenseDto): Promise<Expense> {
    const newExpense = new this.expenseModel(createExpenseDto);
    return await newExpense.save();
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto): Promise<Expense> {
    const updatedExpense = await this.expenseModel
      .findByIdAndUpdate(id, updateExpenseDto, { new: true })
      .exec();
    if (!updatedExpense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return updatedExpense;
  }
  

  // Tìm một Expense theo ID
  async findOne(id: string): Promise<Expense> {
    const expense = await this.expenseModel.findById(id).exec();
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return expense;
  }

  // Lấy dữ liệu biểu đồ (mock)
  async getChartData(
    startDate: string,
    endDate: string,
    groupBy: string,
  ): Promise<any> {
    // Thực hiện truy vấn dữ liệu thực nếu cần.
    // Hiện tại trả về dữ liệu mock.
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

  // Xóa một Expense theo ID
  async remove(id: string): Promise<{ message: string }> {
    const result = await this.expenseModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    return { message: 'Expense deleted successfully' };
  }
}
