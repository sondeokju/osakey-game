import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserSettingService } from './user_setting.service';
import { CreateUserSettingDto } from './dto/create-user_setting.dto';
import { UpdateUserSettingDto } from './dto/update-user_setting.dto';

@Controller('user-setting')
export class UserSettingController {
  constructor(private readonly userSettingService: UserSettingService) {}

  @Post()
  create(@Body() createUserSettingDto: CreateUserSettingDto) {
    return this.userSettingService.create(createUserSettingDto);
  }

  @Get()
  findAll() {
    return this.userSettingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSettingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSettingDto: UpdateUserSettingDto) {
    return this.userSettingService.update(+id, updateUserSettingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSettingService.remove(+id);
  }
}
