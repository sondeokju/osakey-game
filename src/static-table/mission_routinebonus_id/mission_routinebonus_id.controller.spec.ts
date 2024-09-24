import { Test, TestingModule } from '@nestjs/testing';
import { MissionRoutinebonusIdController } from './mission_routinebonus_id.controller';
import { MissionRoutinebonusIdService } from './mission_routinebonus_id.service';

describe('MissionRoutinebonusIdController', () => {
  let controller: MissionRoutinebonusIdController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MissionRoutinebonusIdController],
      providers: [MissionRoutinebonusIdService],
    }).compile();

    controller = module.get<MissionRoutinebonusIdController>(MissionRoutinebonusIdController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
