import { Module } from '@nestjs/common';
import { RunStageService } from './run_stage.service';
import { RunStageController } from './run_stage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RunStage } from './entities/run_stage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RunStage])],
  exports: [RunStageService],
  controllers: [RunStageController],
  providers: [RunStageService],
})
export class RunStageModule {}
