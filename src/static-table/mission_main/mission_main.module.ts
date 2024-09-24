import { Module } from '@nestjs/common';
import { MissionMainService } from './mission_main.service';
import { MissionMainController } from './mission_main.controller';

@Module({
  controllers: [MissionMainController],
  providers: [MissionMainService],
})
export class MissionMainModule {}
