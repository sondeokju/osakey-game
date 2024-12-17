import { Test, TestingModule } from '@nestjs/testing';
import { UserEquipSlotController } from './user_equip_slot.controller';
import { UserEquipSlotService } from './user_equip_slot.service';

describe('UserEquipSlotController', () => {
  let controller: UserEquipSlotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEquipSlotController],
      providers: [UserEquipSlotService],
    }).compile();

    controller = module.get<UserEquipSlotController>(UserEquipSlotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
