import { Module } from '@nestjs/common';
import { MissionRoutineService } from './mission_routine.service';
import { MissionRoutineController } from './mission_routine.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionRoutine } from './entities/mission_routine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MissionRoutine])],
  exports: [MissionRoutineService],
  controllers: [MissionRoutineController],
  providers: [MissionRoutineService],
})
export class MissionRoutineModule {}
