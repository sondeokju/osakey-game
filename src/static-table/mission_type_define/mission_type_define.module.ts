import { Module } from '@nestjs/common';
import { MissionTypeDefineService } from './mission_type_define.service';
import { MissionTypeDefineController } from './mission_type_define.controller';

@Module({
  controllers: [MissionTypeDefineController],
  providers: [MissionTypeDefineService],
})
export class MissionTypeDefineModule {}
