import { Test, TestingModule } from '@nestjs/testing';
import { DispatchEquipGradeService } from './dispatch_equip_grade.service';

describe('DispatchEquipGradeService', () => {
  let service: DispatchEquipGradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DispatchEquipGradeService],
    }).compile();

    service = module.get<DispatchEquipGradeService>(DispatchEquipGradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
