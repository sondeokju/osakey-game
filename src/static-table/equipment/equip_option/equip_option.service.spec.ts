import { Test, TestingModule } from '@nestjs/testing';
import { EquipOptionService } from './equip_option.service';

describe('EquipOptionService', () => {
  let service: EquipOptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipOptionService],
    }).compile();

    service = module.get<EquipOptionService>(EquipOptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
