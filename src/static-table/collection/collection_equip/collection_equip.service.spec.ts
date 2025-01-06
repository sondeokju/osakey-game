import { Test, TestingModule } from '@nestjs/testing';
import { CollectionEquipService } from './collection_equip.service';

describe('CollectionEquipService', () => {
  let service: CollectionEquipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CollectionEquipService],
    }).compile();

    service = module.get<CollectionEquipService>(CollectionEquipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
