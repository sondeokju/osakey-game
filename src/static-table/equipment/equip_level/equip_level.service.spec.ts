import { Test, TestingModule } from '@nestjs/testing';
import { EquipLevelService } from './equip_level.service';

describe('EquipLevelService', () => {
  let service: EquipLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipLevelService],
    }).compile();

    service = module.get<EquipLevelService>(EquipLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
