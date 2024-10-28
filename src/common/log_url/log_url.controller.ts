import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogUrlService } from './log_url.service';
import { CreateLogUrlDto } from './dto/create-log_url.dto';
import { UpdateLogUrlDto } from './dto/update-log_url.dto';

@Controller('log-url')
export class LogUrlController {
  constructor(private readonly logUrlService: LogUrlService) {}

  @Post()
  create(@Body() createLogUrlDto: CreateLogUrlDto) {
    return this.logUrlService.create(createLogUrlDto);
  }

  @Get()
  findAll() {
    return this.logUrlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logUrlService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLogUrlDto: UpdateLogUrlDto) {
    return this.logUrlService.update(+id, updateLogUrlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logUrlService.remove(+id);
  }
}
