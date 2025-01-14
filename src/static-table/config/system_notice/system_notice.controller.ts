import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SystemNoticeService } from './system_notice.service';
import { CreateSystemNoticeDto } from './dto/create-system_notice.dto';
import { UpdateSystemNoticeDto } from './dto/update-system_notice.dto';

@Controller('system-notice')
export class SystemNoticeController {
  constructor(private readonly systemNoticeService: SystemNoticeService) {}

  @Post()
  create(@Body() createSystemNoticeDto: CreateSystemNoticeDto) {
    return this.systemNoticeService.create(createSystemNoticeDto);
  }

  @Get()
  findAll() {
    return this.systemNoticeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.systemNoticeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSystemNoticeDto: UpdateSystemNoticeDto) {
    return this.systemNoticeService.update(+id, updateSystemNoticeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemNoticeService.remove(+id);
  }
}
