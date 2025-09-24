import { Test, TestingModule } from '@nestjs/testing';
import { LimitesController } from './limites.controller';
import { LimitesService } from './limites.service';

describe('LimitesController', () => {
  let controller: LimitesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LimitesController],
      providers: [LimitesService],
    }).compile();

    controller = module.get<LimitesController>(LimitesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
