import { Test, TestingModule } from '@nestjs/testing';
import { DispatchRewardController } from './dispatch_reward.controller';
import { DispatchRewardService } from './dispatch_reward.service';

describe('DispatchRewardController', () => {
  let controller: DispatchRewardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DispatchRewardController],
      providers: [DispatchRewardService],
    }).compile();

    controller = module.get<DispatchRewardController>(DispatchRewardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
