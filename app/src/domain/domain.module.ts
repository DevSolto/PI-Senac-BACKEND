import { Module } from '@nestjs/common';
import { DevicesModule } from './devices/devices.module';
import { DataProcessModule } from './data.process/data.process.module';
import { UsersModule } from './users/users.module';
import { CompanysModule } from './companies/companys.module';
import { SilosModule } from './silos/silos.module';
import { AlertsModule } from './alerts/alerts.module';

@Module({
  imports: [DevicesModule, DataProcessModule, UsersModule, CompanysModule, SilosModule, AlertsModule],
})
export class DomainModule {}
