import { Test, TestingModule } from '@nestjs/testing';
import { MissionSubController } from './mission_sub.controller';
import { MissionSubService } from './mission_sub.service';

describe('MissionSubController', () => {
  let controller: MissionSubController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MissionSubController],
      providers: [MissionSubService],
    }).compile();

    controller = module.get<MissionSubController>(MissionSubController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
