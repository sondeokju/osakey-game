import { Test, TestingModule } from '@nestjs/testing';
import { MissionCategoryController } from './mission_category.controller';
import { MissionCategoryService } from './mission_category.service';

describe('MissionCategoryController', () => {
  let controller: MissionCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MissionCategoryController],
      providers: [MissionCategoryService],
    }).compile();

    controller = module.get<MissionCategoryController>(MissionCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
