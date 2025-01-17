import { Test, TestingModule } from '@nestjs/testing';
import { SuitUltimateLevelInfoController } from './suit_ultimate_level_info.controller';
import { SuitUltimateLevelInfoService } from './suit_ultimate_level_info.service';

describe('SuitUltimateLevelInfoController', () => {
  let controller: SuitUltimateLevelInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuitUltimateLevelInfoController],
      providers: [SuitUltimateLevelInfoService],
    }).compile();

    controller = module.get<SuitUltimateLevelInfoController>(SuitUltimateLevelInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
