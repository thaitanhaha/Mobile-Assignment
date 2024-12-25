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

export class CreateMGDto {
    @ApiProperty({ example: 100.50, description: 'Total amount of the margin/goal' })
    @IsNumber()
    totalAmount: number;
  
    @ApiProperty({ example: '2024-12-01', description: 'Date of the margin/goal' })
    @IsString()
    date: string;
  
    @ApiProperty({ example: 'Food', description: 'Category of the margin/goal' })
    @IsString()
    category: string;
  
    @ApiProperty({ example: 'For business expansion', description: 'Purpose of the margin/goal' })
    @IsString()
    purpose: string;
  
    @ApiProperty({ example: '2024-12-31', description: 'Deadline of the margin/goal' })
    @IsString()
    mgDate: string;
  
    @ApiProperty({ type: [Item], description: 'List of items purchased', required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Item)
    items?: Item[];
}
