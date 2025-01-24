import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RunStageService } from './run_stage.service';
import { CreateRunStageDto } from './dto/create-run_stage.dto';
import { UpdateRunStageDto } from './dto/update-run_stage.dto';

@Controller('run-stage')
export class RunStageController {
  constructor(private readonly runStageService: RunStageService) {}

  @Post()
  create(@Body() createRunStageDto: CreateRunStageDto) {
    return this.runStageService.create(createRunStageDto);
  }

  @Get()
  findAll() {
    return this.runStageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.runStageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRunStageDto: UpdateRunStageDto) {
    return this.runStageService.update(+id, updateRunStageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.runStageService.remove(+id);
  }
}
