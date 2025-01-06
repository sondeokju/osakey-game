import { Test, TestingModule } from '@nestjs/testing';
import { CollectionSuitController } from './collection_suit.controller';
import { CollectionSuitService } from './collection_suit.service';

describe('CollectionSuitController', () => {
  let controller: CollectionSuitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionSuitController],
      providers: [CollectionSuitService],
    }).compile();

    controller = module.get<CollectionSuitController>(CollectionSuitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
