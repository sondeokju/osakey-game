import { Module } from '@nestjs/common';
import { BattleStageService } from './battle_stage.service';
import { BattleStageController } from './battle_stage.controller';
import { BattleStage } from './entities/battle_stage.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BattleStage])],
  exports: [BattleStageService],
  controllers: [BattleStageController],
  providers: [BattleStageService],
})
export class BattleStageModule {}
