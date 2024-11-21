import { Test, TestingModule } from '@nestjs/testing';
import { UserSnsRewardService } from './user_sns_reward.service';

describe('UserSnsRewardService', () => {
  let service: UserSnsRewardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSnsRewardService],
    }).compile();

    service = module.get<UserSnsRewardService>(UserSnsRewardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
