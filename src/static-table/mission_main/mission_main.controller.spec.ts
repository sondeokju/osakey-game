import { Test, TestingModule } from '@nestjs/testing';
import { MissionMainController } from './mission_main.controller';
import { MissionMainService } from './mission_main.service';

describe('MissionMainController', () => {
  let controller: MissionMainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MissionMainController],
      providers: [MissionMainService],
    }).compile();

    controller = module.get<MissionMainController>(MissionMainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
