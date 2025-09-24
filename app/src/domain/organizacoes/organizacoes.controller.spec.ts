import { Test, TestingModule } from '@nestjs/testing';
import { OrganizacoesController } from './organizacoes.controller';
import { OrganizacoesService } from './organizacoes.service';

describe('OrganizacoesController', () => {
  let controller: OrganizacoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizacoesController],
      providers: [OrganizacoesService],
    }).compile();

    controller = module.get<OrganizacoesController>(OrganizacoesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
