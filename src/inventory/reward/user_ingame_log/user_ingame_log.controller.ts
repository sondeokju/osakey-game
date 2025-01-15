import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserIngameLogService } from './user_ingame_log.service';
import { CreateUserIngameLogDto } from './dto/create-user_ingame_log.dto';
import { UpdateUserIngameLogDto } from './dto/update-user_ingame_log.dto';

@Controller('user-ingame-log')
export class UserIngameLogController {
  constructor(private readonly userIngameLogService: UserIngameLogService) {}

  @Post()
  create(@Body() createUserIngameLogDto: CreateUserIngameLogDto) {
    return this.userIngameLogService.create(createUserIngameLogDto);
  }

  @Get()
  findAll() {
    return this.userIngameLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userIngameLogService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserIngameLogDto: UpdateUserIngameLogDto) {
    return this.userIngameLogService.update(+id, updateUserIngameLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userIngameLogService.remove(+id);
  }
}
