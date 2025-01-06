import { Test, TestingModule } from '@nestjs/testing';
import { CollectionNpcService } from './collection_npc.service';

describe('CollectionNpcService', () => {
  let service: CollectionNpcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionNpcService],
    }).compile();

    service = module.get<CollectionNpcService>(CollectionNpcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
