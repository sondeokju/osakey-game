import { Module } from '@nestjs/common';
import { PassMissionService } from './pass_mission.service';
import { PassMissionController } from './pass_mission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassMission } from './entities/pass_mission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PassMission])],
  exports: [PassMissionService],
  controllers: [PassMissionController],
  providers: [PassMissionService],
})
export class PassMissionModule {}
