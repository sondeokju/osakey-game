import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserSuitService } from './user_suit.service';
import { CreateUserSuitDto } from './dto/create-user_suit.dto';
import { UpdateUserSuitDto } from './dto/update-user_suit.dto';

@Controller('user-suit')
export class UserSuitController {
  constructor(private readonly userSuitService: UserSuitService) {}

  @Post()
  create(@Body() createUserSuitDto: CreateUserSuitDto) {
    return this.userSuitService.create(createUserSuitDto);
  }

  @Get()
  findAll() {
    return this.userSuitService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSuitService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSuitDto: UpdateUserSuitDto) {
    return this.userSuitService.update(+id, updateUserSuitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSuitService.remove(+id);
  }
}
