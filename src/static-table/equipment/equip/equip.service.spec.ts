import { Test, TestingModule } from '@nestjs/testing';
import { EquipService } from './equip.service';

describe('EquipService', () => {
  let service: EquipService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipService],
    }).compile();

    service = module.get<EquipService>(EquipService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
