import { Test, TestingModule } from '@nestjs/testing';
import { UserEquipmentSlotController } from './user-equipment-slot.controller';
import { UserEquipmentSlotService } from './user-equipment-slot.service';

describe('UserEquipmentSlotController', () => {
  let controller: UserEquipmentSlotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEquipmentSlotController],
      providers: [UserEquipmentSlotService],
    }).compile();

    controller = module.get<UserEquipmentSlotController>(UserEquipmentSlotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
