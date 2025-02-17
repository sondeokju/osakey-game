import { Test, TestingModule } from '@nestjs/testing';
import { UserAchieveRankingController } from './user_achieve_ranking.controller';
import { UserAchieveRankingService } from './user_achieve_ranking.service';

describe('UserAchieveRankingController', () => {
  let controller: UserAchieveRankingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAchieveRankingController],
      providers: [UserAchieveRankingService],
    }).compile();

    controller = module.get<UserAchieveRankingController>(UserAchieveRankingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
