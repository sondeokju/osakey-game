import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserMembershipService } from './user_membership.service';
import { CreateUserMembershipDto } from './dto/create-user_membership.dto';
import { UpdateUserMembershipDto } from './dto/update-user_membership.dto';

@Controller('user-membership')
export class UserMembershipController {
  constructor(private readonly userMembershipService: UserMembershipService) {}

  @Post()
  create(@Body() createUserMembershipDto: CreateUserMembershipDto) {
    return this.userMembershipService.create(createUserMembershipDto);
  }

  @Get()
  findAll() {
    return this.userMembershipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userMembershipService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserMembershipDto: UpdateUserMembershipDto) {
    return this.userMembershipService.update(+id, updateUserMembershipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userMembershipService.remove(+id);
  }
}
