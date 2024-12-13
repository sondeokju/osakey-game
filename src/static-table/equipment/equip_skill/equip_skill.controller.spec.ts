import { Test, TestingModule } from '@nestjs/testing';
import { EquipSkillController } from './equip_skill.controller';
import { EquipSkillService } from './equip_skill.service';

describe('EquipSkillController', () => {
  let controller: EquipSkillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EquipSkillController],
      providers: [EquipSkillService],
    }).compile();

    controller = module.get<EquipSkillController>(EquipSkillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
