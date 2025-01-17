import { Test, TestingModule } from '@nestjs/testing';
import { PassMissionController } from './pass_mission.controller';
import { PassMissionService } from './pass_mission.service';

describe('PassMissionController', () => {
  let controller: PassMissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PassMissionController],
      providers: [PassMissionService],
    }).compile();

    controller = module.get<PassMissionController>(PassMissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
