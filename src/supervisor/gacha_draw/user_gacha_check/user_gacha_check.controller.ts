import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserGachaCheckService } from './user_gacha_check.service';
import { CreateUserGachaCheckDto } from './dto/create-user_gacha_check.dto';
import { UpdateUserGachaCheckDto } from './dto/update-user_gacha_check.dto';

@Controller('user-gacha-check')
export class UserGachaCheckController {
  constructor(private readonly userGachaCheckService: UserGachaCheckService) {}

  @Post()
  create(@Body() createUserGachaCheckDto: CreateUserGachaCheckDto) {
    return this.userGachaCheckService.create(createUserGachaCheckDto);
  }

  @Get()
  findAll() {
    return this.userGachaCheckService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userGachaCheckService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserGachaCheckDto: UpdateUserGachaCheckDto) {
    return this.userGachaCheckService.update(+id, updateUserGachaCheckDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userGachaCheckService.remove(+id);
  }
}
