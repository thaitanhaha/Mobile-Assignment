import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpensesModule } from '../expenses/expenses.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [UploadModule, ExpensesModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
