import { Test, TestingModule } from '@nestjs/testing';
import { MissionKindController } from './mission_kind.controller';
import { MissionKindService } from './mission_kind.service';

describe('MissionKindController', () => {
  let controller: MissionKindController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MissionKindController],
      providers: [MissionKindService],
    }).compile();

    controller = module.get<MissionKindController>(MissionKindController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
