import { Test, TestingModule } from '@nestjs/testing';
import { SilosController } from './silos.controller';
import { SilosService } from './silos.service';

describe('SilosController', () => {
  let controller: SilosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SilosController],
      providers: [SilosService],
    }).compile();

    controller = module.get<SilosController>(SilosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
