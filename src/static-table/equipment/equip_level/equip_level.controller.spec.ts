import { Test, TestingModule } from '@nestjs/testing';
import { EquipLevelController } from './equip_level.controller';
import { EquipLevelService } from './equip_level.service';

describe('EquipLevelController', () => {
  let controller: EquipLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipLevelController],
      providers: [EquipLevelService],
    }).compile();

    controller = module.get<EquipLevelController>(EquipLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
