import { Test, TestingModule } from '@nestjs/testing';
import { UserEduStatsController } from './user_edu_stats.controller';
import { UserEduStatsService } from './user_edu_stats.service';

describe('UserEduStatsController', () => {
  let controller: UserEduStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserEduStatsController],
      providers: [UserEduStatsService],
    }).compile();

    controller = module.get<UserEduStatsController>(UserEduStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
