import { Test, TestingModule } from '@nestjs/testing';
import { SnsRewardController } from './sns_reward.controller';
import { SnsRewardService } from './sns_reward.service';

describe('SnsRewardController', () => {
  let controller: SnsRewardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnsRewardController],
      providers: [SnsRewardService],
    }).compile();

    controller = module.get<SnsRewardController>(SnsRewardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
