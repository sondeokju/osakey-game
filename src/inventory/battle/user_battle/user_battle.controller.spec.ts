import { Test, TestingModule } from '@nestjs/testing';
import { UserBattleController } from './user_battle.controller';
import { UserBattleService } from './user_battle.service';

describe('UserBattleController', () => {
  let controller: UserBattleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBattleController],
      providers: [UserBattleService],
    }).compile();

    controller = module.get<UserBattleController>(UserBattleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
