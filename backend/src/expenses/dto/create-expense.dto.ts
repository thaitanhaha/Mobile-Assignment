import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class Item {
  @ApiProperty({ example: 'Item Name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 10.99 })
  @IsNumber()
  price: number;
}

export class CreateExpenseDto {
  @ApiProperty({ example: 100.50, description: 'Total amount of the expense' })
  @IsNumber()
  totalAmount: number;

  @ApiProperty({ example: '2024-12-01', description: 'Date of the expense' })
  @IsString()
  date: string;

  @ApiProperty({ example: 'Food', description: 'Category of the expense' })
  @IsString()
  category: string;

  @ApiProperty({ type: [Item], description: 'List of items purchased', required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Item)
  items?: Item[];
}
