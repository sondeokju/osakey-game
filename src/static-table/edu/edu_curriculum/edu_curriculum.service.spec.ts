import { Test, TestingModule } from '@nestjs/testing';
import { EduCurriculumService } from './edu_curriculum.service';

describe('EduCurriculumService', () => {
  let service: EduCurriculumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EduCurriculumService],
    }).compile();

    service = module.get<EduCurriculumService>(EduCurriculumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
