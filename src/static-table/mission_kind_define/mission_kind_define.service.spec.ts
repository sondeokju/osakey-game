import { Test, TestingModule } from '@nestjs/testing';
import { MissionKindDefineService } from './mission_kind_define.service';

describe('MissionKindDefineService', () => {
  let service: MissionKindDefineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MissionKindDefineService],
    }).compile();

    service = module.get<MissionKindDefineService>(MissionKindDefineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
