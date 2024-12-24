import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Expense extends Document {
  @Prop({ type: String, required: true })
  id: string;

  @Prop({ type: Number, required: true })
  totalAmount: number;

  @Prop({ type: Date, required: true })
  date: string;

  @Prop({ type: String, required: true })
  category: string;

  @Prop({ 
    type: [{ name: { type: String }, price: { type: Number } }],
    required: false
  })
  items: { name: string; price: number }[];
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);
