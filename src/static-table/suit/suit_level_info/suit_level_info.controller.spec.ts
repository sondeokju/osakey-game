import { Test, TestingModule } from '@nestjs/testing';
import { SuitLevelInfoController } from './suit_level_info.controller';
import { SuitLevelInfoService } from './suit_level_info.service';

describe('SuitLevelInfoController', () => {
  let controller: SuitLevelInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuitLevelInfoController],
      providers: [SuitLevelInfoService],
    }).compile();

    controller = module.get<SuitLevelInfoController>(SuitLevelInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
