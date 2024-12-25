import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class MG extends Document {
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

  @Prop({ required: true })
  purpose: string;

  @Prop({ required: true })
  range: string;

  @Prop({ required: true })
  mgDate: string;
}

export const MGSchema = SchemaFactory.createForClass(MG);