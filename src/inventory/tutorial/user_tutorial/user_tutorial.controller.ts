import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTutorialService } from './user_tutorial.service';
import { CreateUserTutorialDto } from './dto/create-user_tutorial.dto';
import { UpdateUserTutorialDto } from './dto/update-user_tutorial.dto';

@Controller('user-tutorial')
export class UserTutorialController {
  constructor(private readonly userTutorialService: UserTutorialService) {}

  @Post()
  create(@Body() createUserTutorialDto: CreateUserTutorialDto) {
    return this.userTutorialService.create(createUserTutorialDto);
  }

  @Get()
  findAll() {
    return this.userTutorialService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTutorialService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTutorialDto: UpdateUserTutorialDto) {
    return this.userTutorialService.update(+id, updateUserTutorialDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTutorialService.remove(+id);
  }
}
