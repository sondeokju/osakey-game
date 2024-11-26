import { Test, TestingModule } from '@nestjs/testing';
import { UserAbilityStatsService } from './user_ability_stats.service';

describe('UserAbilityStatsService', () => {
  let service: UserAbilityStatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserAbilityStatsService],
    }).compile();

    service = module.get<UserAbilityStatsService>(UserAbilityStatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
