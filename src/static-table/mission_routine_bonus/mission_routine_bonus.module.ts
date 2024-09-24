import { Module } from '@nestjs/common';
import { MissionRoutineBonusService } from './mission_routine_bonus.service';
import { MissionRoutineBonusController } from './mission_routine_bonus.controller';

@Module({
  controllers: [MissionRoutineBonusController],
  providers: [MissionRoutineBonusService],
})
export class MissionRoutineBonusModule {}
