import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserDispatchRentamaService } from './user_dispatch_rentama.service';
import { CreateUserDispatchRentamaDto } from './dto/create-user_dispatch_rentama.dto';
import { UpdateUserDispatchRentamaDto } from './dto/update-user_dispatch_rentama.dto';

@Controller('user-dispatch-rentama')
export class UserDispatchRentamaController {
  constructor(private readonly userDispatchRentamaService: UserDispatchRentamaService) {}

  @Post()
  create(@Body() createUserDispatchRentamaDto: CreateUserDispatchRentamaDto) {
    return this.userDispatchRentamaService.create(createUserDispatchRentamaDto);
  }

  @Get()
  findAll() {
    return this.userDispatchRentamaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userDispatchRentamaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDispatchRentamaDto: UpdateUserDispatchRentamaDto) {
    return this.userDispatchRentamaService.update(+id, updateUserDispatchRentamaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userDispatchRentamaService.remove(+id);
  }
}
