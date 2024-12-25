import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsEnum, IsString } from 'class-validator';

export class GetChartQueryDto {
    @ApiProperty({
        description: 'Unique identifier for the user',
        type: String,
        example: '12345678',
    })
  @ApiProperty({
    description: 'Start date for the data range',
    type: String,
    format: 'date',  // Indicate that this is a date string
    example: '2024-01-01',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'End date for the data range',
    type: String,
    format: 'date',  // Indicate that this is a date string
    example: '2024-12-31',
  })
  @IsDateString()
  endDate: string;

  @ApiProperty({
    description: 'How to group the data. Choose "month" to see spending by month or "category" to see a breakdown by category.',
    type: String,
    enum: ['month', 'category'],
    example: 'month',
    required: false,  // Make it optional since it's not always required
  })
  @IsOptional()  // Optional, so the query can work without it
  @IsEnum(['month', 'category'])  // Restrict to specific values
  @IsString()
  groupBy?: string;  // This is the optional field
}
