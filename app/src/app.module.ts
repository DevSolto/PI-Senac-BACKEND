import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { InfraModule } from './infra/infra.module';
import { DomainModule } from './domain/domain.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    EventEmitterModule.forRoot({
      global: true,
    }),
    InfraModule,
    DomainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}