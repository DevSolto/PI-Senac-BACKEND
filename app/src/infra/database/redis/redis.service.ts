// 1. Importe o 'forwardRef'
import { Inject, Injectable, OnModuleInit, forwardRef } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import Redis from 'ioredis';
import { REDIS_CLIENT } from './redis.module';

@Injectable()
export class RedisSubscriberService implements OnModuleInit {
  private readonly subscriber: Redis;

  constructor(
    @Inject(forwardRef(() => REDIS_CLIENT)) private readonly redisClient: Redis,
    private readonly eventEmitter: EventEmitter2,
  ) {
    this.subscriber = this.redisClient.duplicate();
  }

  onModuleInit() {
    this.subscriber.psubscribe('device-updates:*');
    this.subscriber.on('pmessage', (pattern, channel, message) => {
      console.log(`[Redis Pub/Sub] Mensagem recebida no canal ${channel}`);
      this.eventEmitter.emit('device.update', { channel, message });
    });
  }
}