import { Test, TestingModule } from '@nestjs/testing';
import { MissionCategoryService } from './mission_category.service';

describe('MissionCategoryService', () => {
  let service: MissionCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MissionCategoryService],
    }).compile();

    service = module.get<MissionCategoryService>(MissionCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
