import { Test, TestingModule } from '@nestjs/testing';
import { RewardInvenController } from './reward_inven.controller';
import { RewardInvenService } from './reward_inven.service';

describe('RewardInvenController', () => {
  let controller: RewardInvenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardInvenController],
      providers: [RewardInvenService],
    }).compile();

    controller = module.get<RewardInvenController>(RewardInvenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
