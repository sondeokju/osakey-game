import { Test, TestingModule } from '@nestjs/testing';
import { CollectionBossMemoryController } from './collection_boss_memory.controller';
import { CollectionBossMemoryService } from './collection_boss_memory.service';

describe('CollectionBossMemoryController', () => {
  let controller: CollectionBossMemoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionBossMemoryController],
      providers: [CollectionBossMemoryService],
    }).compile();

    controller = module.get<CollectionBossMemoryController>(CollectionBossMemoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
