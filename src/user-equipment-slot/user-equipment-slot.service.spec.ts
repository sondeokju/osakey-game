import { Test, TestingModule } from '@nestjs/testing';
import { UserEquipmentSlotService } from './user-equipment-slot.service';

describe('UserEquipmentSlotService', () => {
  let service: UserEquipmentSlotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEquipmentSlotService],
    }).compile();

    service = module.get<UserEquipmentSlotService>(UserEquipmentSlotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
