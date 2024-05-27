import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EquipStatService } from './equip-stat.service';
import { CreateEquipStatDto } from './dto/create-equip-stat.dto';
import { UpdateEquipStatDto } from './dto/update-equip-stat.dto';

@Controller('equip-stat')
export class EquipStatController {
  constructor(private readonly equipStatService: EquipStatService) {}

  @Post()
  create(@Body() createEquipStatDto: CreateEquipStatDto) {
    return this.equipStatService.create(createEquipStatDto);
  }

  @Get()
  findAll() {
    return this.equipStatService.findAll();
  }

  @Get(':id')
  async getEquipStatId(@Param('id') id: string) {
    console.log('get item:', id);

    const result = await this.equipStatService.getEquipStatId(+id);
    //console.log('result item:', result);

    return JSON.stringify(result);
  }

  @Get(':item_equipslot_idx/:item_grade_idx/:item_level')
  async getEquipStat(
    @Param('item_equipslot_idx') item_equipslot_idx: string,
    @Param('item_grade_idx') item_grade_idx: string,
    @Param('item_level') item_level: string,
  ) {
    const result = await this.equipStatService.getEquipStat(
      +item_equipslot_idx,
      +item_grade_idx,
      +item_level,
    );

    return JSON.stringify(result);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEquipStatDto: UpdateEquipStatDto,
  ) {
    return this.equipStatService.update(+id, updateEquipStatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipStatService.remove(+id);
  }
}
