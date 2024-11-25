import { Test, TestingModule } from '@nestjs/testing';
import { DispatchEquipLevelController } from './dispatch_equip_level.controller';
import { DispatchEquipLevelService } from './dispatch_equip_level.service';

describe('DispatchEquipLevelController', () => {
  let controller: DispatchEquipLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DispatchEquipLevelController],
      providers: [DispatchEquipLevelService],
    }).compile();

    controller = module.get<DispatchEquipLevelController>(DispatchEquipLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
