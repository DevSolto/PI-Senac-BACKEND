import { Module } from '@nestjs/common';
import { OrganizacoesService } from './organizacoes.service';
import { OrganizacoesController } from './organizacoes.controller';

@Module({
  controllers: [OrganizacoesController],
  providers: [OrganizacoesService],
})
export class OrganizacoesModule {}
