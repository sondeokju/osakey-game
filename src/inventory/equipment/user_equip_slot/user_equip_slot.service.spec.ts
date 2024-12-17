import { Test, TestingModule } from '@nestjs/testing';
import { UserEquipSlotService } from './user_equip_slot.service';

describe('UserEquipSlotService', () => {
  let service: UserEquipSlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEquipSlotService],
    }).compile();

    service = module.get<UserEquipSlotService>(UserEquipSlotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
