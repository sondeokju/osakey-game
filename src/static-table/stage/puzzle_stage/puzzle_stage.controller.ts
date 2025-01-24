import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PuzzleStageService } from './puzzle_stage.service';
import { CreatePuzzleStageDto } from './dto/create-puzzle_stage.dto';
import { UpdatePuzzleStageDto } from './dto/update-puzzle_stage.dto';

@Controller('puzzle-stage')
export class PuzzleStageController {
  constructor(private readonly puzzleStageService: PuzzleStageService) {}

  @Post()
  create(@Body() createPuzzleStageDto: CreatePuzzleStageDto) {
    return this.puzzleStageService.create(createPuzzleStageDto);
  }

  @Get()
  findAll() {
    return this.puzzleStageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.puzzleStageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePuzzleStageDto: UpdatePuzzleStageDto) {
    return this.puzzleStageService.update(+id, updatePuzzleStageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.puzzleStageService.remove(+id);
  }
}
