import { Test, TestingModule } from '@nestjs/testing';
import { SnsLevelService } from './sns_level.service';

describe('SnsLevelService', () => {
  let service: SnsLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnsLevelService],
    }).compile();

    service = module.get<SnsLevelService>(SnsLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
