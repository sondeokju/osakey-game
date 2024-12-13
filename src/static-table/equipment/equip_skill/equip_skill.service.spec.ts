import { Test, TestingModule } from '@nestjs/testing';
import { EquipSkillService } from './equip_skill.service';

describe('EquipSkillService', () => {
  let service: EquipSkillService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipSkillService],
    }).compile();

    service = module.get<EquipSkillService>(EquipSkillService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
