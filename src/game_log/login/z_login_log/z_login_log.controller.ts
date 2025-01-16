import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZLoginLogService } from './z_login_log.service';
import { CreateZLoginLogDto } from './dto/create-z_login_log.dto';
import { UpdateZLoginLogDto } from './dto/update-z_login_log.dto';

@Controller('z-login-log')
export class ZLoginLogController {
  constructor(private readonly zLoginLogService: ZLoginLogService) {}

  @Post()
  create(@Body() createZLoginLogDto: CreateZLoginLogDto) {
    return this.zLoginLogService.create(createZLoginLogDto);
  }

  @Get()
  findAll() {
    return this.zLoginLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zLoginLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZLoginLogDto: UpdateZLoginLogDto) {
    return this.zLoginLogService.update(+id, updateZLoginLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zLoginLogService.remove(+id);
  }
}
