import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseModule } from '../expenses/expenses.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    UploadModule, 
    ExpenseModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
