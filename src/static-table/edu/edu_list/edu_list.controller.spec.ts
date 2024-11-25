import { Test, TestingModule } from '@nestjs/testing';
import { EduListController } from './edu_list.controller';
import { EduListService } from './edu_list.service';

describe('EduListController', () => {
  let controller: EduListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EduListController],
      providers: [EduListService],
    }).compile();

    controller = module.get<EduListController>(EduListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
