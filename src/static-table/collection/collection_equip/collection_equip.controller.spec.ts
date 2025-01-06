import { Test, TestingModule } from '@nestjs/testing';
import { CollectionEquipController } from './collection_equip.controller';
import { CollectionEquipService } from './collection_equip.service';

describe('CollectionEquipController', () => {
  let controller: CollectionEquipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CollectionEquipController],
      providers: [CollectionEquipService],
    }).compile();

    controller = module.get<CollectionEquipController>(CollectionEquipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
