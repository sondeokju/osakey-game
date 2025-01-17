import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PassLevelService } from './pass_level.service';
import { CreatePassLevelDto } from './dto/create-pass_level.dto';
import { UpdatePassLevelDto } from './dto/update-pass_level.dto';

@Controller('pass-level')
export class PassLevelController {
  constructor(private readonly passLevelService: PassLevelService) {}

  @Post()
  create(@Body() createPassLevelDto: CreatePassLevelDto) {
    return this.passLevelService.create(createPassLevelDto);
  }

  @Get()
  findAll() {
    return this.passLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passLevelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePassLevelDto: UpdatePassLevelDto) {
    return this.passLevelService.update(+id, updatePassLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passLevelService.remove(+id);
  }
}
