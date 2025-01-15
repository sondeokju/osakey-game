import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserIngameRewardService } from './user_ingame_reward.service';
import { CreateUserIngameRewardDto } from './dto/create-user_ingame_reward.dto';
import { UpdateUserIngameRewardDto } from './dto/update-user_ingame_reward.dto';

@Controller('user-ingame-reward')
export class UserIngameRewardController {
  constructor(private readonly userIngameRewardService: UserIngameRewardService) {}

  @Post()
  create(@Body() createUserIngameRewardDto: CreateUserIngameRewardDto) {
    return this.userIngameRewardService.create(createUserIngameRewardDto);
  }

  @Get()
  findAll() {
    return this.userIngameRewardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userIngameRewardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserIngameRewardDto: UpdateUserIngameRewardDto) {
    return this.userIngameRewardService.update(+id, updateUserIngameRewardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userIngameRewardService.remove(+id);
  }
}
