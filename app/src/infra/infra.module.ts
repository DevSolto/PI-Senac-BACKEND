import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/typeorm/database.module';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [DatabaseModule, SecurityModule]
})
export class InfraModule {}
