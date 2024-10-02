import { Module } from '@nestjs/common';
import { MissionKindService } from './mission_kind.service';
import { MissionKindController } from './mission_kind.controller';

@Module({
  controllers: [MissionKindController],
  providers: [MissionKindService],
})
export class MissionKindModule {}
