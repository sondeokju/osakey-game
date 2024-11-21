import { Test, TestingModule } from '@nestjs/testing';
import { UserSnsRewardController } from './user_sns_reward.controller';
import { UserSnsRewardService } from './user_sns_reward.service';

describe('UserSnsRewardController', () => {
  let controller: UserSnsRewardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSnsRewardController],
      providers: [UserSnsRewardService],
    }).compile();

    controller = module.get<UserSnsRewardController>(UserSnsRewardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
