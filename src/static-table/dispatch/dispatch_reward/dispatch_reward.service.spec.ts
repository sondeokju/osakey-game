import { Test, TestingModule } from '@nestjs/testing';
import { DispatchRewardService } from './dispatch_reward.service';

describe('DispatchRewardService', () => {
  let service: DispatchRewardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DispatchRewardService],
    }).compile();

    service = module.get<DispatchRewardService>(DispatchRewardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
