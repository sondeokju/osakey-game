import { Module } from '@nestjs/common';
import { MissionSubService } from './mission_sub.service';
import { MissionSubController } from './mission_sub.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionSub } from './entities/mission_sub.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MissionSub])],
  exports: [MissionSubService],
  controllers: [MissionSubController],
  providers: [MissionSubService],
})
export class MissionSubModule {}
