import { Test, TestingModule } from '@nestjs/testing';
import { MissionTypeService } from './mission_type.service';

describe('MissionTypeService', () => {
  let service: MissionTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MissionTypeService],
    }).compile();

    service = module.get<MissionTypeService>(MissionTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
