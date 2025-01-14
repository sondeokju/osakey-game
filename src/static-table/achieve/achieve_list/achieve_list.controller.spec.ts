import { Test, TestingModule } from '@nestjs/testing';
import { AchieveListController } from './achieve_list.controller';
import { AchieveListService } from './achieve_list.service';

describe('AchieveListController', () => {
  let controller: AchieveListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AchieveListController],
      providers: [AchieveListService],
    }).compile();

    controller = module.get<AchieveListController>(AchieveListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
