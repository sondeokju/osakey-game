import { Test, TestingModule } from '@nestjs/testing';
import { SuitOptionService } from './suit_option.service';

describe('SuitOptionService', () => {
  let service: SuitOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuitOptionService],
    }).compile();

    service = module.get<SuitOptionService>(SuitOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
