import { Test, TestingModule } from '@nestjs/testing';
import { SuitService } from './suit.service';

describe('SuitService', () => {
  let service: SuitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuitService],
    }).compile();

    service = module.get<SuitService>(SuitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
