import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from '../expenses/expenses.module';
import { UploadModule } from '../upload/upload.module';
import { BudgetModule } from '../budget/budgets.module';
import { MGModule } from '../mg/margin_goal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UploadModule, 
    ExpenseModule,
    BudgetModule,
    MGModule,],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
