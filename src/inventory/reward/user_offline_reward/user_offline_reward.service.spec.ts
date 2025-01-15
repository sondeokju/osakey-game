import { Test, TestingModule } from '@nestjs/testing';
import { UserOfflineRewardService } from './user_offline_reward.service';

describe('UserOfflineRewardService', () => {
  let service: UserOfflineRewardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserOfflineRewardService],
    }).compile();

    service = module.get<UserOfflineRewardService>(UserOfflineRewardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
