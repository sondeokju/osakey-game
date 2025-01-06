import { Test, TestingModule } from '@nestjs/testing';
import { CollectionBossController } from './collection_boss.controller';
import { CollectionBossService } from './collection_boss.service';

describe('CollectionBossController', () => {
  let controller: CollectionBossController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionBossController],
      providers: [CollectionBossService],
    }).compile();

    controller = module.get<CollectionBossController>(CollectionBossController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
