import { Test, TestingModule } from '@nestjs/testing';
import { UserIngameRewardController } from './user_ingame_reward.controller';
import { UserIngameRewardService } from './user_ingame_reward.service';

describe('UserIngameRewardController', () => {
  let controller: UserIngameRewardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserIngameRewardController],
      providers: [UserIngameRewardService],
    }).compile();

    controller = module.get<UserIngameRewardController>(UserIngameRewardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
