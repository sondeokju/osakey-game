import { Test, TestingModule } from '@nestjs/testing';
import { SuitUltimateInfoService } from './suit_ultimate_info.service';

describe('SuitUltimateInfoService', () => {
  let service: SuitUltimateInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuitUltimateInfoService],
    }).compile();

    service = module.get<SuitUltimateInfoService>(SuitUltimateInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
