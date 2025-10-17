import { Controller, Get, Param, Sse, MessageEvent } from '@nestjs/common'; 
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, fromEvent, filter, map } from 'rxjs';
import { DevicesService } from './devices.service';

@Controller('devices')
export class DevicesController {
  constructor(
    private readonly devicesService: DevicesService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @Get(':id/history')
  getDeviceHistory(@Param('id') deviceId: string) {
    return this.devicesService.getDeviceHistory(deviceId);
  }

  @Sse(':id/updates')
  sseDeviceUpdates(@Param('id') deviceId: string): Observable<MessageEvent> {
    return fromEvent(this.eventEmitter, 'device.update').pipe(
      filter((data: { channel: string; message: string }) => {
        return data.channel === `device-updates:${deviceId}`;
      }),
      map((data: { channel: string; message: string }): MessageEvent => {
        return { data: JSON.parse(data.message) };
      }),
    );
  }
}