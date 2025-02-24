import { Test, TestingModule } from '@nestjs/testing';
import { UserRentamaEquipSlotController } from './user_rentama_equip_slot.controller';
import { UserRentamaEquipSlotService } from './user_rentama_equip_slot.service';

describe('UserRentamaEquipSlotController', () => {
  let controller: UserRentamaEquipSlotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRentamaEquipSlotController],
      providers: [UserRentamaEquipSlotService],
    }).compile();

    controller = module.get<UserRentamaEquipSlotController>(UserRentamaEquipSlotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
