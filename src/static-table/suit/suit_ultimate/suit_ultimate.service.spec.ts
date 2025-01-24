import { Test, TestingModule } from '@nestjs/testing';
import { SuitUltimateService } from './suit_ultimate.service';

describe('SuitUltimateService', () => {
  let service: SuitUltimateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuitUltimateService],
    }).compile();

    service = module.get<SuitUltimateService>(SuitUltimateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
