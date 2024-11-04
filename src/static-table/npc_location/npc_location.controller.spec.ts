import { Test, TestingModule } from '@nestjs/testing';
import { NpcLocationController } from './npc_location.controller';
import { NpcLocationService } from './npc_location.service';

describe('NpcLocationController', () => {
  let controller: NpcLocationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NpcLocationController],
      providers: [NpcLocationService],
    }).compile();

    controller = module.get<NpcLocationController>(NpcLocationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
