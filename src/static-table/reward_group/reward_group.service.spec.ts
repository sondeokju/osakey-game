import { Test, TestingModule } from '@nestjs/testing';
import { RewardGroupService } from './reward_group.service';

describe('RewardGroupService', () => {
  let service: RewardGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardGroupService],
    }).compile();

    service = module.get<RewardGroupService>(RewardGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
