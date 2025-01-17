import { Test, TestingModule } from '@nestjs/testing';
import { PassLevelService } from './pass_level.service';

describe('PassLevelService', () => {
  let service: PassLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PassLevelService],
    }).compile();

    service = module.get<PassLevelService>(PassLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
