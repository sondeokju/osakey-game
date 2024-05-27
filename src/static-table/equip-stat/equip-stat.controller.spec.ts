import { Test, TestingModule } from '@nestjs/testing';
import { EquipStatController } from './equip-stat.controller';
import { EquipStatService } from './equip-stat.service';

describe('EquipStatController', () => {
  let controller: EquipStatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipStatController],
      providers: [EquipStatService],
    }).compile();

    controller = module.get<EquipStatController>(EquipStatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
