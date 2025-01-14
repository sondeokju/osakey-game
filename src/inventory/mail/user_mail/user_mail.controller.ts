import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserMailService } from './user_mail.service';
import { CreateUserMailDto } from './dto/create-user_mail.dto';
import { UpdateUserMailDto } from './dto/update-user_mail.dto';

@Controller('user-mail')
export class UserMailController {
  constructor(private readonly userMailService: UserMailService) {}

  @Post()
  create(@Body() createUserMailDto: CreateUserMailDto) {
    return this.userMailService.create(createUserMailDto);
  }

  @Get()
  findAll() {
    return this.userMailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userMailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserMailDto: UpdateUserMailDto) {
    return this.userMailService.update(+id, updateUserMailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userMailService.remove(+id);
  }
}
