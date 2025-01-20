import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserDispatchService } from './user_dispatch.service';
import { CreateUserDispatchDto } from './dto/create-user_dispatch.dto';
import { UpdateUserDispatchDto } from './dto/update-user_dispatch.dto';

@Controller('user-dispatch')
export class UserDispatchController {
  constructor(private readonly userDispatchService: UserDispatchService) {}

  @Post()
  create(@Body() createUserDispatchDto: CreateUserDispatchDto) {
    return this.userDispatchService.create(createUserDispatchDto);
  }

  @Get()
  findAll() {
    return this.userDispatchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userDispatchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDispatchDto: UpdateUserDispatchDto) {
    return this.userDispatchService.update(+id, updateUserDispatchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userDispatchService.remove(+id);
  }
}
