import { Module } from '@nestjs/common';
import { MissionRoutineService } from './mission_routine.service';
import { MissionRoutineController } from './mission_routine.controller';

@Module({
  controllers: [MissionRoutineController],
  providers: [MissionRoutineService],
})
export class MissionRoutineModule {}
