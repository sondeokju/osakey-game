import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserSecameDiaryService } from './user_secame_diary.service';
import { CreateUserSecameDiaryDto } from './dto/create-user_secame_diary.dto';
import { UpdateUserSecameDiaryDto } from './dto/update-user_secame_diary.dto';

@Controller('user-secame-diary')
export class UserSecameDiaryController {
  constructor(private readonly userSecameDiaryService: UserSecameDiaryService) {}

  @Post()
  create(@Body() createUserSecameDiaryDto: CreateUserSecameDiaryDto) {
    return this.userSecameDiaryService.create(createUserSecameDiaryDto);
  }

  @Get()
  findAll() {
    return this.userSecameDiaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSecameDiaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSecameDiaryDto: UpdateUserSecameDiaryDto) {
    return this.userSecameDiaryService.update(+id, updateUserSecameDiaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSecameDiaryService.remove(+id);
  }
}
