import { Test, TestingModule } from '@nestjs/testing';
import { UserBattlePassRewardService } from './user_battle_pass_reward.service';

describe('UserBattlePassRewardService', () => {
  let service: UserBattlePassRewardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBattlePassRewardService],
    }).compile();

    service = module.get<UserBattlePassRewardService>(UserBattlePassRewardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
