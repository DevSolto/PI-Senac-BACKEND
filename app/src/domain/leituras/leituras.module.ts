import { Module } from '@nestjs/common';
import { LeiturasService } from './leituras.service';
import { LeiturasController } from './leituras.controller';

@Module({
  controllers: [LeiturasController],
  providers: [LeiturasService],
})
export class LeiturasModule {}
