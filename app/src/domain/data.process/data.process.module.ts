import { Module } from '@nestjs/common';
import { DataProcessService } from './data.process.service';
import { DataProcessController } from './data.process.controller';

@Module({
  controllers: [DataProcessController],
  providers: [DataProcessService],
})
export class DataProcessModule {}
