import { Module } from '@nestjs/common';
import { MissionKindDefineService } from './mission_kind_define.service';
import { MissionKindDefineController } from './mission_kind_define.controller';

@Module({
  controllers: [MissionKindDefineController],
  providers: [MissionKindDefineService],
})
export class MissionKindDefineModule {}
