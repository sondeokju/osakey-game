import { Test, TestingModule } from '@nestjs/testing';
import { UserEquipService } from './user_equip.service';

describe('UserEquipService', () => {
  let service: UserEquipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEquipService],
    }).compile();

    service = module.get<UserEquipService>(UserEquipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
