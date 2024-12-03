import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Expense {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal')
  totalAmount: number;

  @Column('date')
  date: string;

  @Column('text')
  category: string;

  @Column('json', { nullable: true })
  items: { name: string; price: number }[];
}
