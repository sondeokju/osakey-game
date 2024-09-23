import { Test, TestingModule } from '@nestjs/testing';
import { RewardGroupController } from './reward_group.controller';
import { RewardGroupService } from './reward_group.service';

describe('RewardGroupController', () => {
  let controller: RewardGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardGroupController],
      providers: [RewardGroupService],
    }).compile();

    controller = module.get<RewardGroupController>(RewardGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
