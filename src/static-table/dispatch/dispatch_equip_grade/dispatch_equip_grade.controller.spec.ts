import { Test, TestingModule } from '@nestjs/testing';
import { DispatchEquipGradeController } from './dispatch_equip_grade.controller';
import { DispatchEquipGradeService } from './dispatch_equip_grade.service';

describe('DispatchEquipGradeController', () => {
  let controller: DispatchEquipGradeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DispatchEquipGradeController],
      providers: [DispatchEquipGradeService],
    }).compile();

    controller = module.get<DispatchEquipGradeController>(DispatchEquipGradeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
