import { Test, TestingModule } from '@nestjs/testing';
import { NpcLocationService } from './npc_location.service';

describe('NpcLocationService', () => {
  let service: NpcLocationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NpcLocationService],
    }).compile();

    service = module.get<NpcLocationService>(NpcLocationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
