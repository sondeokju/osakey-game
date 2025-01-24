import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BattleStageService } from './battle_stage.service';
import { CreateBattleStageDto } from './dto/create-battle_stage.dto';
import { UpdateBattleStageDto } from './dto/update-battle_stage.dto';

@Controller('battle-stage')
export class BattleStageController {
  constructor(private readonly battleStageService: BattleStageService) {}

  @Post()
  create(@Body() createBattleStageDto: CreateBattleStageDto) {
    return this.battleStageService.create(createBattleStageDto);
  }

  @Get()
  findAll() {
    return this.battleStageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.battleStageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBattleStageDto: UpdateBattleStageDto) {
    return this.battleStageService.update(+id, updateBattleStageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.battleStageService.remove(+id);
  }
}
