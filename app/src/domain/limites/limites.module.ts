import { Module } from '@nestjs/common';
import { LimitesService } from './limites.service';
import { LimitesController } from './limites.controller';

@Module({
  controllers: [LimitesController],
  providers: [LimitesService],
})
export class LimitesModule {}
