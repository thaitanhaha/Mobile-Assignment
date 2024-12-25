// import { Module } from '@nestjs/common';
import { MGsController } from './margin_goal.controller';
import { MGsService } from './margin_goal.service';

// @Module({
//   controllers: [MGsController],
//   providers: [MGsService],
// })
// export class MGsModule {}


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MG, MGSchema } from './schemas/mg.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: MG.name, schema: MGSchema }]),
  ],
  controllers: [MGsController],
  providers: [MGsService],
})
export class MGModule {}
