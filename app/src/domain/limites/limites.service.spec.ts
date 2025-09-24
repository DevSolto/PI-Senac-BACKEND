import { Test, TestingModule } from '@nestjs/testing';
import { LimitesService } from './limites.service';

describe('LimitesService', () => {
  let service: LimitesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LimitesService],
    }).compile();

    service = module.get<LimitesService>(LimitesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
