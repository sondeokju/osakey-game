import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuitSkillService } from './suit_skill.service';
import { CreateSuitSkillDto } from './dto/create-suit_skill.dto';
import { UpdateSuitSkillDto } from './dto/update-suit_skill.dto';

@Controller('suit-skill')
export class SuitSkillController {
  constructor(private readonly suitSkillService: SuitSkillService) {}

  @Post()
  create(@Body() createSuitSkillDto: CreateSuitSkillDto) {
    return this.suitSkillService.create(createSuitSkillDto);
  }

  @Get()
  findAll() {
    return this.suitSkillService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.suitSkillService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSuitSkillDto: UpdateSuitSkillDto) {
    return this.suitSkillService.update(+id, updateSuitSkillDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.suitSkillService.remove(+id);
  }
}
