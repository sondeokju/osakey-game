import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PassService } from './pass.service';
import { CreatePassDto } from './dto/create-pass.dto';
import { UpdatePassDto } from './dto/update-pass.dto';

@Controller('pass')
export class PassController {
  constructor(private readonly passService: PassService) {}

  @Post()
  create(@Body() createPassDto: CreatePassDto) {
    return this.passService.create(createPassDto);
  }

  @Get()
  findAll() {
    return this.passService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePassDto: UpdatePassDto) {
    return this.passService.update(+id, updatePassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passService.remove(+id);
  }
}
