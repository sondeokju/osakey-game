import { Test, TestingModule } from '@nestjs/testing';
import { SuitInfoService } from './suit_info.service';

describe('SuitInfoService', () => {
  let service: SuitInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuitInfoService],
    }).compile();

    service = module.get<SuitInfoService>(SuitInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
