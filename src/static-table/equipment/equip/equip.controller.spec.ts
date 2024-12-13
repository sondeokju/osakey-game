import { Test, TestingModule } from '@nestjs/testing';
import { EquipController } from './equip.controller';
import { EquipService } from './equip.service';

describe('EquipController', () => {
  let controller: EquipController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipController],
      providers: [EquipService],
    }).compile();

    controller = module.get<EquipController>(EquipController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
