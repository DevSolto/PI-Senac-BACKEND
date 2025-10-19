import { Module } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { RedisModule } from 'src/infra/database/redis/redis.module';
import { RedisSubscriberService } from 'src/infra/database/redis/redis.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Device } from './entities/device.entity';
import { MqttService } from './mqtt.service';

@Module({
  imports: [
    RedisModule,
    EventEmitterModule,
    ConfigModule,
    TypeOrmModule.forFeature([Device]),
  ],
  controllers: [DevicesController],
  providers: [
    DevicesService,
    RedisSubscriberService,
    MqttService,
  ],
})
export class DevicesModule {}