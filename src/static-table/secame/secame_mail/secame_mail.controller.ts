import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SecameMailService } from './secame_mail.service';
import { CreateSecameMailDto } from './dto/create-secame_mail.dto';
import { UpdateSecameMailDto } from './dto/update-secame_mail.dto';

@Controller('secame-mail')
export class SecameMailController {
  constructor(private readonly secameMailService: SecameMailService) {}

  @Post()
  create(@Body() createSecameMailDto: CreateSecameMailDto) {
    return this.secameMailService.create(createSecameMailDto);
  }

  @Get()
  findAll() {
    return this.secameMailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.secameMailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSecameMailDto: UpdateSecameMailDto) {
    return this.secameMailService.update(+id, updateSecameMailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.secameMailService.remove(+id);
  }
}
