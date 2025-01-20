import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserSecameMailService } from './user_secame_mail.service';
import { CreateUserSecameMailDto } from './dto/create-user_secame_mail.dto';
import { UpdateUserSecameMailDto } from './dto/update-user_secame_mail.dto';

@Controller('user-secame-mail')
export class UserSecameMailController {
  constructor(private readonly userSecameMailService: UserSecameMailService) {}

  @Post()
  create(@Body() createUserSecameMailDto: CreateUserSecameMailDto) {
    return this.userSecameMailService.create(createUserSecameMailDto);
  }

  @Get()
  findAll() {
    return this.userSecameMailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSecameMailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSecameMailDto: UpdateUserSecameMailDto) {
    return this.userSecameMailService.update(+id, updateUserSecameMailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSecameMailService.remove(+id);
  }
}
