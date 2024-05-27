import { Test, TestingModule } from '@nestjs/testing';
import { EquipStatService } from './equip-stat.service';

describe('EquipStatService', () => {
  let service: EquipStatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipStatService],
    }).compile();

    service = module.get<EquipStatService>(EquipStatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
