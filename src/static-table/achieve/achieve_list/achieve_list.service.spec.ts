import { Test, TestingModule } from '@nestjs/testing';
import { AchieveListService } from './achieve_list.service';

describe('AchieveListService', () => {
  let service: AchieveListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AchieveListService],
    }).compile();

    service = module.get<AchieveListService>(AchieveListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
