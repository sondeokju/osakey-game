import { Test, TestingModule } from '@nestjs/testing';
import { UserBattlePassRewardController } from './user_battle_pass_reward.controller';
import { UserBattlePassRewardService } from './user_battle_pass_reward.service';

describe('UserBattlePassRewardController', () => {
  let controller: UserBattlePassRewardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBattlePassRewardController],
      providers: [UserBattlePassRewardService],
    }).compile();

    controller = module.get<UserBattlePassRewardController>(UserBattlePassRewardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
