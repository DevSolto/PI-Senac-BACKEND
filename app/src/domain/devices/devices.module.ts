import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { RedisModule } from 'src/infra/database/redis/redis.module';
import { RedisSubscriberService } from 'src/infra/database/redis/redis.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [RedisModule, EventEmitterModule],
  controllers: [DevicesController],
  providers: [DevicesService, RedisSubscriberService],
})
export class DevicesModule {}
