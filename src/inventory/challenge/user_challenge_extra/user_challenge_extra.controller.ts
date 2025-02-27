import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserChallengeExtraService } from './user_challenge_extra.service';
import { CreateUserChallengeExtraDto } from './dto/create-user_challenge_extra.dto';
import { UpdateUserChallengeExtraDto } from './dto/update-user_challenge_extra.dto';

@Controller('user-challenge-extra')
export class UserChallengeExtraController {
  constructor(private readonly userChallengeExtraService: UserChallengeExtraService) {}

  @Post()
  create(@Body() createUserChallengeExtraDto: CreateUserChallengeExtraDto) {
    return this.userChallengeExtraService.create(createUserChallengeExtraDto);
  }

  @Get()
  findAll() {
    return this.userChallengeExtraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userChallengeExtraService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserChallengeExtraDto: UpdateUserChallengeExtraDto) {
    return this.userChallengeExtraService.update(+id, updateUserChallengeExtraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userChallengeExtraService.remove(+id);
  }
}
