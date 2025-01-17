import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PassSeasonService } from './pass_season.service';
import { CreatePassSeasonDto } from './dto/create-pass_season.dto';
import { UpdatePassSeasonDto } from './dto/update-pass_season.dto';

@Controller('pass-season')
export class PassSeasonController {
  constructor(private readonly passSeasonService: PassSeasonService) {}

  @Post()
  create(@Body() createPassSeasonDto: CreatePassSeasonDto) {
    return this.passSeasonService.create(createPassSeasonDto);
  }

  @Get()
  findAll() {
    return this.passSeasonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passSeasonService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePassSeasonDto: UpdatePassSeasonDto) {
    return this.passSeasonService.update(+id, updatePassSeasonDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passSeasonService.remove(+id);
  }
}
