import { Module } from '@nestjs/common';
import { MissionService } from './mission.service';
import { MissionController } from './mission.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mission } from './entities/mission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mission])],
  exports: [MissionService],
  controllers: [MissionController],
  providers: [MissionService],
})
export class MissionModule {}
