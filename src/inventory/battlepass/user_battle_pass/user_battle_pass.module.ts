import { Module } from '@nestjs/common';
import { UserBattlePassService } from './user_battle_pass.service';
import { UserBattlePassController } from './user_battle_pass.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBattlePass } from './entities/user_battle_pass.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserBattlePass])],
  exports: [UserBattlePassService],
  controllers: [UserBattlePassController],
  providers: [UserBattlePassService],
})
export class UserBattlePassModule {}
