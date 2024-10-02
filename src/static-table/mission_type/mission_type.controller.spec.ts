import { Test, TestingModule } from '@nestjs/testing';
import { MissionTypeController } from './mission_type.controller';
import { MissionTypeService } from './mission_type.service';

describe('MissionTypeController', () => {
  let controller: MissionTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MissionTypeController],
      providers: [MissionTypeService],
    }).compile();

    controller = module.get<MissionTypeController>(MissionTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
