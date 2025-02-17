import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAchieveRankingService } from './user_achieve_ranking.service';
import { CreateUserAchieveRankingDto } from './dto/create-user_achieve_ranking.dto';
import { UpdateUserAchieveRankingDto } from './dto/update-user_achieve_ranking.dto';

@Controller('user-achieve-ranking')
export class UserAchieveRankingController {
  constructor(private readonly userAchieveRankingService: UserAchieveRankingService) {}

  @Post()
  create(@Body() createUserAchieveRankingDto: CreateUserAchieveRankingDto) {
    return this.userAchieveRankingService.create(createUserAchieveRankingDto);
  }

  @Get()
  findAll() {
    return this.userAchieveRankingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAchieveRankingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAchieveRankingDto: UpdateUserAchieveRankingDto) {
    return this.userAchieveRankingService.update(+id, updateUserAchieveRankingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAchieveRankingService.remove(+id);
  }
}
