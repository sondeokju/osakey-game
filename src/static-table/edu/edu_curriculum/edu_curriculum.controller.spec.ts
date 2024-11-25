import { Test, TestingModule } from '@nestjs/testing';
import { EduCurriculumController } from './edu_curriculum.controller';
import { EduCurriculumService } from './edu_curriculum.service';

describe('EduCurriculumController', () => {
  let controller: EduCurriculumController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EduCurriculumController],
      providers: [EduCurriculumService],
    }).compile();

    controller = module.get<EduCurriculumController>(EduCurriculumController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
