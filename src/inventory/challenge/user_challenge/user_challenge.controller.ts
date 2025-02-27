import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserChallengeService } from './user_challenge.service';
import { CreateUserChallengeDto } from './dto/create-user_challenge.dto';
import { UpdateUserChallengeDto } from './dto/update-user_challenge.dto';

@Controller('user-challenge')
export class UserChallengeController {
  constructor(private readonly userChallengeService: UserChallengeService) {}

  @Post()
  create(@Body() createUserChallengeDto: CreateUserChallengeDto) {
    return this.userChallengeService.create(createUserChallengeDto);
  }

  @Get()
  findAll() {
    return this.userChallengeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userChallengeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserChallengeDto: UpdateUserChallengeDto) {
    return this.userChallengeService.update(+id, updateUserChallengeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userChallengeService.remove(+id);
  }
}
