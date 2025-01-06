import { Test, TestingModule } from '@nestjs/testing';
import { CollectionBossService } from './collection_boss.service';

describe('CollectionBossService', () => {
  let service: CollectionBossService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionBossService],
    }).compile();

    service = module.get<CollectionBossService>(CollectionBossService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
