import { Test, TestingModule } from '@nestjs/testing';
import { EquipOptionController } from './equip_option.controller';
import { EquipOptionService } from './equip_option.service';

describe('EquipOptionController', () => {
  let controller: EquipOptionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipOptionController],
      providers: [EquipOptionService],
    }).compile();

    controller = module.get<EquipOptionController>(EquipOptionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
