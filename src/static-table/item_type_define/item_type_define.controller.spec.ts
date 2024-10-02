import { Test, TestingModule } from '@nestjs/testing';
import { ItemTypeDefineController } from './item_type_define.controller';
import { ItemTypeDefineService } from './item_type_define.service';

describe('ItemTypeDefineController', () => {
  let controller: ItemTypeDefineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemTypeDefineController],
      providers: [ItemTypeDefineService],
    }).compile();

    controller = module.get<ItemTypeDefineController>(ItemTypeDefineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
