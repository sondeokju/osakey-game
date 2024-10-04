import { Module } from '@nestjs/common';
import { MissionRoutineBonusService } from './mission_routine_bonus.service';
import { MissionRoutineBonusController } from './mission_routine_bonus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionRoutineBonus } from './entities/mission_routine_bonus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MissionRoutineBonus])],
  exports: [MissionRoutineBonusService],
  controllers: [MissionRoutineBonusController],
  providers: [MissionRoutineBonusService],
})
export class MissionRoutineBonusModule {}
