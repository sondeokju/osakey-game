import { Test, TestingModule } from '@nestjs/testing';
import { PassBountyService } from './pass_bounty.service';

describe('PassBountyService', () => {
  let service: PassBountyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassBountyService],
    }).compile();

    service = module.get<PassBountyService>(PassBountyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
