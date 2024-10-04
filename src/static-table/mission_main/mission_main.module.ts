import { Module } from '@nestjs/common';
import { MissionMainService } from './mission_main.service';
import { MissionMainController } from './mission_main.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MissionMain } from './entities/mission_main.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MissionMain])],
  exports: [MissionMainService],
  controllers: [MissionMainController],
  providers: [MissionMainService],
})
export class MissionMainModule {}
