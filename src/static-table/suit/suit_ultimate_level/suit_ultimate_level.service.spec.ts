import { Test, TestingModule } from '@nestjs/testing';
import { SuitUltimateLevelService } from './suit_ultimate_level.service';

describe('SuitUltimateLevelService', () => {
  let service: SuitUltimateLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuitUltimateLevelService],
    }).compile();

    service = module.get<SuitUltimateLevelService>(SuitUltimateLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
