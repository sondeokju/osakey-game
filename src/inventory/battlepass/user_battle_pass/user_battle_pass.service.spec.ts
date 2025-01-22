import { Test, TestingModule } from '@nestjs/testing';
import { UserBattlePassService } from './user_battle_pass.service';

describe('UserBattlePassService', () => {
  let service: UserBattlePassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserBattlePassService],
    }).compile();

    service = module.get<UserBattlePassService>(UserBattlePassService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
