import { Test, TestingModule } from '@nestjs/testing';
import { TutorialRewardService } from './tutorial_reward.service';

describe('TutorialRewardService', () => {
  let service: TutorialRewardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TutorialRewardService],
    }).compile();

    service = module.get<TutorialRewardService>(TutorialRewardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
