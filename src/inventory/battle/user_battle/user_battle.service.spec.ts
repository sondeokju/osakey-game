import { Test, TestingModule } from '@nestjs/testing';
import { UserBattleService } from './user_battle.service';

describe('UserBattleService', () => {
  let service: UserBattleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBattleService],
    }).compile();

    service = module.get<UserBattleService>(UserBattleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
