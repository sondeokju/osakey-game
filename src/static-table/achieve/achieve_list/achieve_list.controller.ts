import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AchieveListService } from './achieve_list.service';
import { CreateAchieveListDto } from './dto/create-achieve_list.dto';
import { UpdateAchieveListDto } from './dto/update-achieve_list.dto';

@Controller('achieve-list')
export class AchieveListController {
  constructor(private readonly achieveListService: AchieveListService) {}

  @Post()
  create(@Body() createAchieveListDto: CreateAchieveListDto) {
    return this.achieveListService.create(createAchieveListDto);
  }

  @Get()
  findAll() {
    return this.achieveListService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.achieveListService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAchieveListDto: UpdateAchieveListDto) {
    return this.achieveListService.update(+id, updateAchieveListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.achieveListService.remove(+id);
  }
}
