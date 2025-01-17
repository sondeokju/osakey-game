import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PassEduService } from './pass_edu.service';
import { CreatePassEduDto } from './dto/create-pass_edu.dto';
import { UpdatePassEduDto } from './dto/update-pass_edu.dto';

@Controller('pass-edu')
export class PassEduController {
  constructor(private readonly passEduService: PassEduService) {}

  @Post()
  create(@Body() createPassEduDto: CreatePassEduDto) {
    return this.passEduService.create(createPassEduDto);
  }

  @Get()
  findAll() {
    return this.passEduService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passEduService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePassEduDto: UpdatePassEduDto) {
    return this.passEduService.update(+id, updatePassEduDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passEduService.remove(+id);
  }
}
