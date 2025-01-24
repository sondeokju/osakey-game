import { Test, TestingModule } from '@nestjs/testing';
import { PuzzleStageController } from './puzzle_stage.controller';
import { PuzzleStageService } from './puzzle_stage.service';

describe('PuzzleStageController', () => {
  let controller: PuzzleStageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PuzzleStageController],
      providers: [PuzzleStageService],
    }).compile();

    controller = module.get<PuzzleStageController>(PuzzleStageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
