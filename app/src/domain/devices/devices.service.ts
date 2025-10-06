import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../../infra/database/redis/redis.module';

export interface ChartDataPoint {
  timestamp: number;
  value: any;
}
@Injectable()
export class DevicesService {
  constructor(@Inject(REDIS_CLIENT) private readonly redisClient: Redis) 
  {}

  async getDeviceHistory(deviceId: string): Promise<ChartDataPoint[]> {
    const historyKey = `device:history:${deviceId}`;
    const results = await this.redisClient.zrange(historyKey, 0, -1);

    if (!results || results.length === 0) {
      return [];
    }

    const chartData: ChartDataPoint[] = results.map((jsonData) => {
      const data = JSON.parse(jsonData);
      return {
        timestamp: data.timestamp,
        value: data.payload,
      };
    });

    return chartData;
  }
}
