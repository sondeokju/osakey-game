import { Test, TestingModule } from '@nestjs/testing';
import { BattleStageService } from './battle_stage.service';

describe('BattleStageService', () => {
  let service: BattleStageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BattleStageService],
    }).compile();

    service = module.get<BattleStageService>(BattleStageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
