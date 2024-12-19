import { Test, TestingModule } from '@nestjs/testing';
import { UserEquipOptionService } from './user_equip_option.service';

describe('UserEquipOptionService', () => {
  let service: UserEquipOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEquipOptionService],
    }).compile();

    service = module.get<UserEquipOptionService>(UserEquipOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
