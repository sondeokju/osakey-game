import { Test, TestingModule } from '@nestjs/testing';
import { UserMissionController } from './user_mission.controller';
import { UserMissionService } from './user_mission.service';

describe('UserMissionController', () => {
  let controller: UserMissionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserMissionController],
      providers: [UserMissionService],
    }).compile();

    controller = module.get<UserMissionController>(UserMissionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
