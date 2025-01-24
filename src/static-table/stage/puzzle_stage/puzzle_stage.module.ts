import { Module } from '@nestjs/common';
import { PuzzleStageService } from './puzzle_stage.service';
import { PuzzleStageController } from './puzzle_stage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PuzzleStage } from './entities/puzzle_stage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PuzzleStage])],
  exports: [PuzzleStageService],
  controllers: [PuzzleStageController],
  providers: [PuzzleStageService],
})
export class PuzzleStageModule {}
