// import { Module } from '@nestjs/common';
import { BudgetsController } from './budgets.controller';
import { BudgetsService } from './budgets.service';

// @Module({
//   controllers: [BudgetsController],
//   providers: [BudgetsService],
// })
// export class BudgetsModule {}


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Budget, BudgetSchema } from './schemas/budgets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Budget.name, schema: BudgetSchema }]),
  ],
  controllers: [BudgetsController],
  providers: [BudgetsService],
})
export class BudgetModule {}
