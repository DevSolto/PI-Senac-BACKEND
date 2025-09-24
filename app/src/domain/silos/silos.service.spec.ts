import { Test, TestingModule } from '@nestjs/testing';
import { SilosService } from './silos.service';

describe('SilosService', () => {
  let service: SilosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SilosService],
    }).compile();

    service = module.get<SilosService>(SilosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
