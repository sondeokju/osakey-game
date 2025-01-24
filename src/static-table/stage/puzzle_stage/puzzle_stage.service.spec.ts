import { Test, TestingModule } from '@nestjs/testing';
import { PuzzleStageService } from './puzzle_stage.service';

describe('PuzzleStageService', () => {
  let service: PuzzleStageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PuzzleStageService],
    }).compile();

    service = module.get<PuzzleStageService>(PuzzleStageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
