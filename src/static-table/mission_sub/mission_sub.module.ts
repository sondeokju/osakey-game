import { Module } from '@nestjs/common';
import { MissionSubService } from './mission_sub.service';
import { MissionSubController } from './mission_sub.controller';

@Module({
  controllers: [MissionSubController],
  providers: [MissionSubService],
})
export class MissionSubModule {}
