import { Test, TestingModule } from '@nestjs/testing';
import { MissionRoutineController } from './mission_routine.controller';
import { MissionRoutineService } from './mission_routine.service';

describe('MissionRoutineController', () => {
  let controller: MissionRoutineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MissionRoutineController],
      providers: [MissionRoutineService],
    }).compile();

    controller = module.get<MissionRoutineController>(MissionRoutineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
