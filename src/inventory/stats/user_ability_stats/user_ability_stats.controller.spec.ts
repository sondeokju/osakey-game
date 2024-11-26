import { Test, TestingModule } from '@nestjs/testing';
import { UserAbilityStatsController } from './user_ability_stats.controller';
import { UserAbilityStatsService } from './user_ability_stats.service';

describe('UserAbilityStatsController', () => {
  let controller: UserAbilityStatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserAbilityStatsController],
      providers: [UserAbilityStatsService],
    }).compile();

    controller = module.get<UserAbilityStatsController>(UserAbilityStatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
