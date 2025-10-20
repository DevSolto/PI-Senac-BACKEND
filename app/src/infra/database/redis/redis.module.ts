import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { RedisSubscriberService } from './redis.service';

export const REDIS_CLIENT = 'REDIS_CLIENT';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      useFactory: (configService: ConfigService) => {
        const redisUrl = configService.get<string>('REDIS_URL');

        if (redisUrl) {
          return new Redis(redisUrl);
        }

        const host = configService.get<string>('REDIS_HOST');
        const port = configService.get<string>('REDIS_PORT');

        return new Redis({
          host,
          port: port ? parseInt(port, 10) : undefined,
        });
      },
      inject: [ConfigService],
    },
    RedisSubscriberService,
  ],

  exports: [REDIS_CLIENT, RedisSubscriberService],
})
export class RedisModule {}
