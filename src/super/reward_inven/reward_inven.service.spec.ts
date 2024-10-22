import { Test, TestingModule } from '@nestjs/testing';
import { RewardInvenService } from './reward_inven.service';

describe('RewardInvenService', () => {
  let service: RewardInvenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardInvenService],
    }).compile();

    service = module.get<RewardInvenService>(RewardInvenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
