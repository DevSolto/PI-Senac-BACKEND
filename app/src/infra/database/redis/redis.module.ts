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

        const safeParsePort = (value?: string) => {
          if (!value) {
            return undefined;
          }

          const parsed = Number.parseInt(value, 10);
          return Number.isNaN(parsed) ? undefined : parsed;
        };

        const host = configService.get<string>('REDIS_HOST');
        const port = safeParsePort(configService.get<string>('REDIS_PORT'));

        return new Redis({
          host,
          port,
        });
      },
      inject: [ConfigService],
    },
    RedisSubscriberService,
  ],

  exports: [REDIS_CLIENT, RedisSubscriberService],
})
export class RedisModule {}
