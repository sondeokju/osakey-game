import { Test, TestingModule } from '@nestjs/testing';
import { SuitSkillController } from './suit_skill.controller';
import { SuitSkillService } from './suit_skill.service';

describe('SuitSkillController', () => {
  let controller: SuitSkillController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuitSkillController],
      providers: [SuitSkillService],
    }).compile();

    controller = module.get<SuitSkillController>(SuitSkillController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
