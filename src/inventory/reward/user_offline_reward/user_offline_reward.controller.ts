import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserOfflineRewardService } from './user_offline_reward.service';
import { CreateUserOfflineRewardDto } from './dto/create-user_offline_reward.dto';
import { UpdateUserOfflineRewardDto } from './dto/update-user_offline_reward.dto';

@Controller('user-offline-reward')
export class UserOfflineRewardController {
  constructor(private readonly userOfflineRewardService: UserOfflineRewardService) {}

  @Post()
  create(@Body() createUserOfflineRewardDto: CreateUserOfflineRewardDto) {
    return this.userOfflineRewardService.create(createUserOfflineRewardDto);
  }

  @Get()
  findAll() {
    return this.userOfflineRewardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userOfflineRewardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserOfflineRewardDto: UpdateUserOfflineRewardDto) {
    return this.userOfflineRewardService.update(+id, updateUserOfflineRewardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userOfflineRewardService.remove(+id);
  }
}
