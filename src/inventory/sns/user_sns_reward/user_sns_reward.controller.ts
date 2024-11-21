import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserSnsRewardService } from './user_sns_reward.service';
import { CreateUserSnsRewardDto } from './dto/create-user_sns_reward.dto';
import { UpdateUserSnsRewardDto } from './dto/update-user_sns_reward.dto';

@Controller('user-sns-reward')
export class UserSnsRewardController {
  constructor(private readonly userSnsRewardService: UserSnsRewardService) {}

  @Post()
  create(@Body() createUserSnsRewardDto: CreateUserSnsRewardDto) {
    return this.userSnsRewardService.create(createUserSnsRewardDto);
  }

  @Get()
  findAll() {
    return this.userSnsRewardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSnsRewardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSnsRewardDto: UpdateUserSnsRewardDto) {
    return this.userSnsRewardService.update(+id, updateUserSnsRewardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSnsRewardService.remove(+id);
  }
}
