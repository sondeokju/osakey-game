import { Test, TestingModule } from '@nestjs/testing';
import { ItemEquipslotController } from './item-equipslot.controller';
import { ItemEquipslotService } from './item-equipslot.service';

describe('ItemEquipslotController', () => {
  let controller: ItemEquipslotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemEquipslotController],
      providers: [ItemEquipslotService],
    }).compile();

    controller = module.get<ItemEquipslotController>(ItemEquipslotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
