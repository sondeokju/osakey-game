import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAchievementsService } from './user_achievements.service';
import { CreateUserAchievementDto } from './dto/create-user_achievement.dto';
import { UpdateUserAchievementDto } from './dto/update-user_achievement.dto';

@Controller('user-achievements')
export class UserAchievementsController {
  constructor(private readonly userAchievementsService: UserAchievementsService) {}

  @Post()
  create(@Body() createUserAchievementDto: CreateUserAchievementDto) {
    return this.userAchievementsService.create(createUserAchievementDto);
  }

  @Get()
  findAll() {
    return this.userAchievementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAchievementsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAchievementDto: UpdateUserAchievementDto) {
    return this.userAchievementsService.update(+id, updateUserAchievementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAchievementsService.remove(+id);
  }
}
