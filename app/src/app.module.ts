import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RedisModule } from './infra/database/redis/redis.module';
import { DevicesModule } from './domain/devices/devices.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot({
      global: true,
    }),
    
    RedisModule,
    DevicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}