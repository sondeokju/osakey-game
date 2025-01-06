import { Test, TestingModule } from '@nestjs/testing';
import { CollectionSuitService } from './collection_suit.service';

describe('CollectionSuitService', () => {
  let service: CollectionSuitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionSuitService],
    }).compile();

    service = module.get<CollectionSuitService>(CollectionSuitService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
