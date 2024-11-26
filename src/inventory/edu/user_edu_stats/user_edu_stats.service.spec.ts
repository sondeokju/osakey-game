import { Test, TestingModule } from '@nestjs/testing';
import { UserEduStatsService } from './user_edu_stats.service';

describe('UserEduStatsService', () => {
  let service: UserEduStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserEduStatsService],
    }).compile();

    service = module.get<UserEduStatsService>(UserEduStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
