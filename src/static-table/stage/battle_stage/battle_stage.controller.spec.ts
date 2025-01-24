import { Test, TestingModule } from '@nestjs/testing';
import { BattleStageController } from './battle_stage.controller';
import { BattleStageService } from './battle_stage.service';

describe('BattleStageController', () => {
  let controller: BattleStageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BattleStageController],
      providers: [BattleStageService],
    }).compile();

    controller = module.get<BattleStageController>(BattleStageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
