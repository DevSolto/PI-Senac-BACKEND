import { Module } from '@nestjs/common';
import { SilosService } from './silos.service';
import { SilosController } from './silos.controller';

@Module({
  controllers: [SilosController],
  providers: [SilosService],
})
export class SilosModule {}
