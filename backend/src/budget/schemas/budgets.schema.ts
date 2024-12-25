import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Budget extends Document {
  @Prop({ required: true, default: () => uuidv4() })
  id: string;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  category: string;

  @Prop({ type: [{ name: String, price: Number }], default: [] })
  items: { name: string; price: number }[];
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
