import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserMemoryShareService } from './user_memory_share.service';
import { CreateUserMemoryShareDto } from './dto/create-user_memory_share.dto';
import { UpdateUserMemoryShareDto } from './dto/update-user_memory_share.dto';

@Controller('user-memory-share')
export class UserMemoryShareController {
  constructor(private readonly userMemoryShareService: UserMemoryShareService) {}

  @Post()
  create(@Body() createUserMemoryShareDto: CreateUserMemoryShareDto) {
    return this.userMemoryShareService.create(createUserMemoryShareDto);
  }

  @Get()
  findAll() {
    return this.userMemoryShareService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userMemoryShareService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserMemoryShareDto: UpdateUserMemoryShareDto) {
    return this.userMemoryShareService.update(+id, updateUserMemoryShareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userMemoryShareService.remove(+id);
  }
}
