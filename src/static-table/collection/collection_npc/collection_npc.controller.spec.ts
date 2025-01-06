import { Test, TestingModule } from '@nestjs/testing';
import { CollectionNpcController } from './collection_npc.controller';
import { CollectionNpcService } from './collection_npc.service';

describe('CollectionNpcController', () => {
  let controller: CollectionNpcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionNpcController],
      providers: [CollectionNpcService],
    }).compile();

    controller = module.get<CollectionNpcController>(CollectionNpcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
