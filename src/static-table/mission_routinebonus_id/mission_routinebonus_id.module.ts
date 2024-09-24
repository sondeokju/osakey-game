import { Module } from '@nestjs/common';
import { MissionRoutinebonusIdService } from './mission_routinebonus_id.service';
import { MissionRoutinebonusIdController } from './mission_routinebonus_id.controller';

@Module({
  controllers: [MissionRoutinebonusIdController],
  providers: [MissionRoutinebonusIdService],
})
export class MissionRoutinebonusIdModule {}
