import { Test, TestingModule } from '@nestjs/testing';
import { SuitLevelService } from './suit_level.service';

describe('SuitLevelService', () => {
  let service: SuitLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuitLevelService],
    }).compile();

    service = module.get<SuitLevelService>(SuitLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
