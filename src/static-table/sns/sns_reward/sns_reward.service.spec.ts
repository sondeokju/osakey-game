import { Test, TestingModule } from '@nestjs/testing';
import { SnsRewardService } from './sns_reward.service';

describe('SnsRewardService', () => {
  let service: SnsRewardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnsRewardService],
    }).compile();

    service = module.get<SnsRewardService>(SnsRewardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
