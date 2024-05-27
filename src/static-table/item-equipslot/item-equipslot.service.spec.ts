import { Test, TestingModule } from '@nestjs/testing';
import { ItemEquipslotService } from './item-equipslot.service';

describe('ItemEquipslotService', () => {
  let service: ItemEquipslotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemEquipslotService],
    }).compile();

    service = module.get<ItemEquipslotService>(ItemEquipslotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
