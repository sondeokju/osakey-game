import { Test, TestingModule } from '@nestjs/testing';
import { RunStageController } from './run_stage.controller';
import { RunStageService } from './run_stage.service';

describe('RunStageController', () => {
  let controller: RunStageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RunStageController],
      providers: [RunStageService],
    }).compile();

    controller = module.get<RunStageController>(RunStageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
