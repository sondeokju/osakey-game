import { Test, TestingModule } from '@nestjs/testing';
import { BountyStageService } from './bounty_stage.service';

describe('BountyStageService', () => {
  let service: BountyStageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BountyStageService],
    }).compile();

    service = module.get<BountyStageService>(BountyStageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
