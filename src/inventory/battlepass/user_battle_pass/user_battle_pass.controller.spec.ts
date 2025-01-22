import { Test, TestingModule } from '@nestjs/testing';
import { UserBattlePassController } from './user_battle_pass.controller';
import { UserBattlePassService } from './user_battle_pass.service';

describe('UserBattlePassController', () => {
  let controller: UserBattlePassController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserBattlePassController],
      providers: [UserBattlePassService],
    }).compile();

    controller = module.get<UserBattlePassController>(UserBattlePassController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
