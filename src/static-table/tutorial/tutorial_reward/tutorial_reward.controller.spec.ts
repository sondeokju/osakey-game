import { Test, TestingModule } from '@nestjs/testing';
import { TutorialRewardController } from './tutorial_reward.controller';
import { TutorialRewardService } from './tutorial_reward.service';

describe('TutorialRewardController', () => {
  let controller: TutorialRewardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutorialRewardController],
      providers: [TutorialRewardService],
    }).compile();

    controller = module.get<TutorialRewardController>(TutorialRewardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
