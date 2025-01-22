import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserBattlePassRewardService } from './user_battle_pass_reward.service';
import { CreateUserBattlePassRewardDto } from './dto/create-user_battle_pass_reward.dto';
import { UpdateUserBattlePassRewardDto } from './dto/update-user_battle_pass_reward.dto';

@Controller('user-battle-pass-reward')
export class UserBattlePassRewardController {
  constructor(private readonly userBattlePassRewardService: UserBattlePassRewardService) {}

  @Post()
  create(@Body() createUserBattlePassRewardDto: CreateUserBattlePassRewardDto) {
    return this.userBattlePassRewardService.create(createUserBattlePassRewardDto);
  }

  @Get()
  findAll() {
    return this.userBattlePassRewardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBattlePassRewardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserBattlePassRewardDto: UpdateUserBattlePassRewardDto) {
    return this.userBattlePassRewardService.update(+id, updateUserBattlePassRewardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBattlePassRewardService.remove(+id);
  }
}
