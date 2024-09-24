import { Test, TestingModule } from '@nestjs/testing';
import { MissionRoutineBonusController } from './mission_routine_bonus.controller';
import { MissionRoutineBonusService } from './mission_routine_bonus.service';

describe('MissionRoutineBonusController', () => {
  let controller: MissionRoutineBonusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MissionRoutineBonusController],
      providers: [MissionRoutineBonusService],
    }).compile();

    controller = module.get<MissionRoutineBonusController>(MissionRoutineBonusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
