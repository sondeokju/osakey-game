import { Injectable } from '@nestjs/common';
import { CreatePuzzleStageDto } from './dto/create-puzzle_stage.dto';
import { UpdatePuzzleStageDto } from './dto/update-puzzle_stage.dto';

@Injectable()
export class PuzzleStageService {
  create(createPuzzleStageDto: CreatePuzzleStageDto) {
    return 'This action adds a new puzzleStage';
  }

  findAll() {
    return `This action returns all puzzleStage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} puzzleStage`;
  }

  update(id: number, updatePuzzleStageDto: UpdatePuzzleStageDto) {
    return `This action updates a #${id} puzzleStage`;
  }

  remove(id: number) {
    return `This action removes a #${id} puzzleStage`;
  }
}
