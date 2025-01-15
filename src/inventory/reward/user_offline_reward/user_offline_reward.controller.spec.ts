import { Test, TestingModule } from '@nestjs/testing';
import { UserOfflineRewardController } from './user_offline_reward.controller';
import { UserOfflineRewardService } from './user_offline_reward.service';

describe('UserOfflineRewardController', () => {
  let controller: UserOfflineRewardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserOfflineRewardController],
      providers: [UserOfflineRewardService],
    }).compile();

    controller = module.get<UserOfflineRewardController>(UserOfflineRewardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
