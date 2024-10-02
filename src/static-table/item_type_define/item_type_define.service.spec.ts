import { Test, TestingModule } from '@nestjs/testing';
import { ItemTypeDefineService } from './item_type_define.service';

describe('ItemTypeDefineService', () => {
  let service: ItemTypeDefineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemTypeDefineService],
    }).compile();

    service = module.get<ItemTypeDefineService>(ItemTypeDefineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
