import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserSnsLevelService } from './user_sns_level.service';
import { CreateUserSnsLevelDto } from './dto/create-user_sns_level.dto';
import { UpdateUserSnsLevelDto } from './dto/update-user_sns_level.dto';

@Controller('user-sns-level')
export class UserSnsLevelController {
  constructor(private readonly userSnsLevelService: UserSnsLevelService) {}

  @Post()
  create(@Body() createUserSnsLevelDto: CreateUserSnsLevelDto) {
    return this.userSnsLevelService.create(createUserSnsLevelDto);
  }

  @Get()
  findAll() {
    return this.userSnsLevelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSnsLevelService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSnsLevelDto: UpdateUserSnsLevelDto) {
    return this.userSnsLevelService.update(+id, updateUserSnsLevelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSnsLevelService.remove(+id);
  }
}
