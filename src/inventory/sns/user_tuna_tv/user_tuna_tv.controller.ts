import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserTunaTvService } from './user_tuna_tv.service';
import { CreateUserTunaTvDto } from './dto/create-user_tuna_tv.dto';
import { UpdateUserTunaTvDto } from './dto/update-user_tuna_tv.dto';

@Controller('user-tuna-tv')
export class UserTunaTvController {
  constructor(private readonly userTunaTvService: UserTunaTvService) {}

  @Post()
  create(@Body() createUserTunaTvDto: CreateUserTunaTvDto) {
    return this.userTunaTvService.create(createUserTunaTvDto);
  }

  @Get()
  findAll() {
    return this.userTunaTvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userTunaTvService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserTunaTvDto: UpdateUserTunaTvDto) {
    return this.userTunaTvService.update(+id, updateUserTunaTvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userTunaTvService.remove(+id);
  }
}
