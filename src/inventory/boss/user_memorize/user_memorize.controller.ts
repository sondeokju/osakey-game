import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserMemorizeService } from './user_memorize.service';
import { CreateUserMemorizeDto } from './dto/create-user_memorize.dto';
import { UpdateUserMemorizeDto } from './dto/update-user_memorize.dto';

@Controller('user-memorize')
export class UserMemorizeController {
  constructor(private readonly userMemorizeService: UserMemorizeService) {}

  @Post()
  create(@Body() createUserMemorizeDto: CreateUserMemorizeDto) {
    return this.userMemorizeService.create(createUserMemorizeDto);
  }

  @Get()
  findAll() {
    return this.userMemorizeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userMemorizeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserMemorizeDto: UpdateUserMemorizeDto) {
    return this.userMemorizeService.update(+id, updateUserMemorizeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userMemorizeService.remove(+id);
  }
}
