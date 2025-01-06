import { Test, TestingModule } from '@nestjs/testing';
import { CollectionBossMemoryService } from './collection_boss_memory.service';

describe('CollectionBossMemoryService', () => {
  let service: CollectionBossMemoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionBossMemoryService],
    }).compile();

    service = module.get<CollectionBossMemoryService>(CollectionBossMemoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
