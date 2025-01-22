import { Module } from '@nestjs/common';
import { UserBattlePassService } from './user_battle_pass.service';
import { UserBattlePassController } from './user_battle_pass.controller';

@Module({
  controllers: [UserBattlePassController],
  providers: [UserBattlePassService],
})
export class UserBattlePassModule {}
