import { Module } from '@nestjs/common';
import { UserBattleService } from './user_battle.service';
import { UserBattleController } from './user_battle.controller';

@Module({
  controllers: [UserBattleController],
  providers: [UserBattleService],
})
export class UserBattleModule {}
