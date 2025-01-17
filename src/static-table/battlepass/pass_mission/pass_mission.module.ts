import { Module } from '@nestjs/common';
import { PassMissionService } from './pass_mission.service';
import { PassMissionController } from './pass_mission.controller';

@Module({
  controllers: [PassMissionController],
  providers: [PassMissionService],
})
export class PassMissionModule {}
