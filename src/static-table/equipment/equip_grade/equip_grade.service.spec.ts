import { Test, TestingModule } from '@nestjs/testing';
import { EquipGradeService } from './equip_grade.service';

describe('EquipGradeService', () => {
  let service: EquipGradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EquipGradeService],
    }).compile();

    service = module.get<EquipGradeService>(EquipGradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
