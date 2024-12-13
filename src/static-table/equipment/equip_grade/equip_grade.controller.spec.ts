import { Test, TestingModule } from '@nestjs/testing';
import { EquipGradeController } from './equip_grade.controller';
import { EquipGradeService } from './equip_grade.service';

describe('EquipGradeController', () => {
  let controller: EquipGradeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipGradeController],
      providers: [EquipGradeService],
    }).compile();

    controller = module.get<EquipGradeController>(EquipGradeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
