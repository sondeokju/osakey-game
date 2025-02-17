import { Test, TestingModule } from '@nestjs/testing';
import { UserAchieveRankingService } from './user_achieve_ranking.service';

describe('UserAchieveRankingService', () => {
  let service: UserAchieveRankingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAchieveRankingService],
    }).compile();

    service = module.get<UserAchieveRankingService>(UserAchieveRankingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
