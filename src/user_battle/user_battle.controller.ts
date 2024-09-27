import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserBattleService } from './user_battle.service';
import { CreateUserBattleDto } from './dto/create-user_battle.dto';
import { UpdateUserBattleDto } from './dto/update-user_battle.dto';

@Controller('user-battle')
export class UserBattleController {
  constructor(private readonly userBattleService: UserBattleService) {}

  @Post()
  create(@Body() createUserBattleDto: CreateUserBattleDto) {
    return this.userBattleService.create(createUserBattleDto);
  }

  @Get()
  findAll() {
    return this.userBattleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userBattleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserBattleDto: UpdateUserBattleDto) {
    return this.userBattleService.update(+id, updateUserBattleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userBattleService.remove(+id);
  }
}
