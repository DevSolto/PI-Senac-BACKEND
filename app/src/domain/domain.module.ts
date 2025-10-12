import { Module } from '@nestjs/common';
import { DevicesModule } from './devices/devices.module';
import { DataProcessModule } from './data.process/data.process.module';
import { UsersModule } from './users/users.module';
import { CompanysModule } from './companys/companys.module';

@Module({
  imports: [DevicesModule, DataProcessModule, UsersModule, CompanysModule]
})
export class DomainModule {}
