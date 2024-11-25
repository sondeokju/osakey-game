import { Test, TestingModule } from '@nestjs/testing';
import { EduListService } from './edu_list.service';

describe('EduListService', () => {
  let service: EduListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EduListService],
    }).compile();

    service = module.get<EduListService>(EduListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
