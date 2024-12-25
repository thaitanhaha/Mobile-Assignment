import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Budget } from './schemas/budgets.schema';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetsService {
  constructor(
    @InjectModel(Budget.name) private readonly budgetModel: Model<Budget>,
  ) {}

  async create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    const newBudget = new this.budgetModel(createBudgetDto);
    return await newBudget.save();
  }

  async update(id: string, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
    const updatedBudget = await this.budgetModel
      .findByIdAndUpdate(id, updateBudgetDto, { new: true })
      .exec();
    if (!updatedBudget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }
    return updatedBudget;
  }
  
  async findAll(): Promise<Budget[]> {
    const budgets = await this.budgetModel.find().exec();
    if (!budgets || budgets.length === 0) {
      throw new NotFoundException(`Budgets not found`);
    }
    return budgets;
  }

  // Tìm một Budget theo ID
  async findOne(id: string): Promise<Budget> {
    const budget = await this.budgetModel.findById(id).exec();
    if (!budget) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }
    return budget;
  }

  // Xóa một Budget theo ID
  async remove(id: string): Promise<{ message: string }> {
    const result = await this.budgetModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Budget with ID ${id} not found`);
    }
    return { message: 'Budget deleted successfully' };
  }
}
