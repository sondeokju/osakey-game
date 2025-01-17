import { Test, TestingModule } from '@nestjs/testing';
import { SuitUltimateLevelInfoService } from './suit_ultimate_level_info.service';

describe('SuitUltimateLevelInfoService', () => {
  let service: SuitUltimateLevelInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuitUltimateLevelInfoService],
    }).compile();

    service = module.get<SuitUltimateLevelInfoService>(SuitUltimateLevelInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
