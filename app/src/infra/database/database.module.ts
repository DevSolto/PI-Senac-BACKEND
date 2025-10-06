import { Module } from '@nestjs/common';
import { RedisModule } from './redis/redis.module';

@Module({
  controllers: [],
  providers: [],
  imports: [RedisModule],
})
export class DatabaseModule {}
