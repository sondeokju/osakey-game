import { Test, TestingModule } from '@nestjs/testing';
import { InvenService } from './inven.service';

describe('InvenService', () => {
  let service: InvenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvenService],
    }).compile();

    service = module.get<InvenService>(InvenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
