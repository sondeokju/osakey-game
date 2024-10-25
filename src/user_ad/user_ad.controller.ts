import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserAdService } from './user_ad.service';
import { CreateUserAdDto } from './dto/create-user_ad.dto';
import { UpdateUserAdDto } from './dto/update-user_ad.dto';

@Controller('user-ad')
export class UserAdController {
  constructor(private readonly userAdService: UserAdService) {}

  @Post()
  create(@Body() createUserAdDto: CreateUserAdDto) {
    return this.userAdService.create(createUserAdDto);
  }

  @Get()
  findAll() {
    return this.userAdService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAdService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAdDto: UpdateUserAdDto) {
    return this.userAdService.update(+id, updateUserAdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAdService.remove(+id);
  }
}
