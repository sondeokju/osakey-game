import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipSkillService } from './equip_skill.service';
import { CreateEquipSkillDto } from './dto/create-equip_skill.dto';
import { UpdateEquipSkillDto } from './dto/update-equip_skill.dto';

@Controller('equip-skill')
export class EquipSkillController {
  constructor(private readonly equipSkillService: EquipSkillService) {}

  @Post()
  create(@Body() createEquipSkillDto: CreateEquipSkillDto) {
    return this.equipSkillService.create(createEquipSkillDto);
  }

  @Get()
  findAll() {
    return this.equipSkillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipSkillService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipSkillDto: UpdateEquipSkillDto) {
    return this.equipSkillService.update(+id, updateEquipSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipSkillService.remove(+id);
  }
}
