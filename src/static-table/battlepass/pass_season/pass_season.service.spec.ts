import { Test, TestingModule } from '@nestjs/testing';
import { PassSeasonService } from './pass_season.service';

describe('PassSeasonService', () => {
  let service: PassSeasonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassSeasonService],
    }).compile();

    service = module.get<PassSeasonService>(PassSeasonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
