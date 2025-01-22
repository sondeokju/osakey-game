import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserBattlePassService } from './user_battle_pass.service';
import { CreateUserBattlePassDto } from './dto/create-user_battle_pass.dto';
import { UpdateUserBattlePassDto } from './dto/update-user_battle_pass.dto';

@Controller('user-battle-pass')
export class UserBattlePassController {
  constructor(private readonly userBattlePassService: UserBattlePassService) {}

  @Post()
  create(@Body() createUserBattlePassDto: CreateUserBattlePassDto) {
    return this.userBattlePassService.create(createUserBattlePassDto);
  }

  @Get()
  findAll() {
    return this.userBattlePassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBattlePassService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserBattlePassDto: UpdateUserBattlePassDto) {
    return this.userBattlePassService.update(+id, updateUserBattlePassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBattlePassService.remove(+id);
  }
}
