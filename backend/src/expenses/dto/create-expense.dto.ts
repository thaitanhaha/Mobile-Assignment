import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateExpenseDto {
  @IsNumber()
  totalAmount: number;

  @IsString()
  date: string;

  @IsString()
  category: string;

  @IsArray()
  @IsOptional()
  items?: {
    name: string;
    price: number;
  }[];
}
