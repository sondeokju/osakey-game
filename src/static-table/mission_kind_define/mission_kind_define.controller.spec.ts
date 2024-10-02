import { Test, TestingModule } from '@nestjs/testing';
import { MissionKindDefineController } from './mission_kind_define.controller';
import { MissionKindDefineService } from './mission_kind_define.service';

describe('MissionKindDefineController', () => {
  let controller: MissionKindDefineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MissionKindDefineController],
      providers: [MissionKindDefineService],
    }).compile();

    controller = module.get<MissionKindDefineController>(MissionKindDefineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
