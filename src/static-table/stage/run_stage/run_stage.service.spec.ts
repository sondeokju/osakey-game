import { Test, TestingModule } from '@nestjs/testing';
import { RunStageService } from './run_stage.service';

describe('RunStageService', () => {
  let service: RunStageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RunStageService],
    }).compile();

    service = module.get<RunStageService>(RunStageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
