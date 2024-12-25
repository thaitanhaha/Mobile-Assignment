import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MG } from './schemas/mg.schema';
import { CreateMGDto } from './dto/create-margin_goal.dto';
import { UpdateMGDto } from './dto/update-margin_goal.dto';

@Injectable()
export class MGsService {
  constructor(
    @InjectModel(MG.name) private readonly mgModel: Model<MG>,
  ) {}

  async create(createMGDto: CreateMGDto): Promise<MG> {
    const newMG = new this.mgModel(createMGDto);
    return await newMG.save();
  }

  async update(id: string, updateMGDto: UpdateMGDto): Promise<MG> {
    const updatedMG = await this.mgModel
      .findByIdAndUpdate(id, updateMGDto, { new: true })
      .exec();
    if (!updatedMG) {
      throw new NotFoundException(`MG with ID ${id} not found`);
    }
    return updatedMG;
  }
  
  async findAll(): Promise<MG[]> {
    const mgs = await this.mgModel.find().exec();
    if (!mgs || mgs.length === 0) {
      throw new NotFoundException(`MGs not found`);
    }
    return mgs;
  }

  async findOne(id: string): Promise<MG> {
    const margin_goal = await this.mgModel.findById(id).exec();
    if (!margin_goal) {
      throw new NotFoundException(`MG with ID ${id} not found`);
    }
    return margin_goal;
  }

  async remove(id: string): Promise<{ message: string }> {
    const result = await this.mgModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`MG with ID ${id} not found`);
    }
    return { message: 'MG deleted successfully' };
  }
}
