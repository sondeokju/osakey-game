import { Test, TestingModule } from '@nestjs/testing';
import { DispatchEquipLevelService } from './dispatch_equip_level.service';

describe('DispatchEquipLevelService', () => {
  let service: DispatchEquipLevelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DispatchEquipLevelService],
    }).compile();

    service = module.get<DispatchEquipLevelService>(DispatchEquipLevelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
