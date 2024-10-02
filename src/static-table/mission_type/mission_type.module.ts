import { Module } from '@nestjs/common';
import { MissionTypeService } from './mission_type.service';
import { MissionTypeController } from './mission_type.controller';

@Module({
  controllers: [MissionTypeController],
  providers: [MissionTypeService],
})
export class MissionTypeModule {}
