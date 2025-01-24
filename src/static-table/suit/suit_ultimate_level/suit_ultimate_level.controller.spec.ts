import { Test, TestingModule } from '@nestjs/testing';
import { SuitUltimateLevelController } from './suit_ultimate_level.controller';
import { SuitUltimateLevelService } from './suit_ultimate_level.service';

describe('SuitUltimateLevelController', () => {
  let controller: SuitUltimateLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuitUltimateLevelController],
      providers: [SuitUltimateLevelService],
    }).compile();

    controller = module.get<SuitUltimateLevelController>(SuitUltimateLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
