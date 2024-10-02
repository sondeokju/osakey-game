import { Test, TestingModule } from '@nestjs/testing';
import { MissionTypeDefineService } from './mission_type_define.service';

describe('MissionTypeDefineService', () => {
  let service: MissionTypeDefineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MissionTypeDefineService],
    }).compile();

    service = module.get<MissionTypeDefineService>(MissionTypeDefineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
