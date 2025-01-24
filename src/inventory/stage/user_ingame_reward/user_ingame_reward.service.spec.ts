import { Test, TestingModule } from '@nestjs/testing';
import { UserIngameRewardService } from './user_ingame_reward.service';

describe('UserIngameRewardService', () => {
  let service: UserIngameRewardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserIngameRewardService],
    }).compile();

    service = module.get<UserIngameRewardService>(UserIngameRewardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
