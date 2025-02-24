import { Test, TestingModule } from '@nestjs/testing';
import { UserRentamaEquipSlotService } from './user_rentama_equip_slot.service';

describe('UserRentamaEquipSlotService', () => {
  let service: UserRentamaEquipSlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRentamaEquipSlotService],
    }).compile();

    service = module.get<UserRentamaEquipSlotService>(UserRentamaEquipSlotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
