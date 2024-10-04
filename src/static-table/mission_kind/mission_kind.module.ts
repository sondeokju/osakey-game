import { Module } from '@nestjs/common';
import { MissionKindService } from './mission_kind.service';
import { MissionKindController } from './mission_kind.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionKind } from './entities/mission_kind.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MissionKind])],
  exports: [MissionKindService],
  controllers: [MissionKindController],
  providers: [MissionKindService],
})
export class MissionKindModule {}
