import { Test, TestingModule } from '@nestjs/testing';
import { MissionTypeDefineController } from './mission_type_define.controller';
import { MissionTypeDefineService } from './mission_type_define.service';

describe('MissionTypeDefineController', () => {
  let controller: MissionTypeDefineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MissionTypeDefineController],
      providers: [MissionTypeDefineService],
    }).compile();

    controller = module.get<MissionTypeDefineController>(MissionTypeDefineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
