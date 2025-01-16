import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserNpcFriendshipService } from './user_npc_friendship.service';
import { CreateUserNpcFriendshipDto } from './dto/create-user_npc_friendship.dto';
import { UpdateUserNpcFriendshipDto } from './dto/update-user_npc_friendship.dto';

@Controller('user-npc-friendship')
export class UserNpcFriendshipController {
  constructor(private readonly userNpcFriendshipService: UserNpcFriendshipService) {}

  @Post()
  create(@Body() createUserNpcFriendshipDto: CreateUserNpcFriendshipDto) {
    return this.userNpcFriendshipService.create(createUserNpcFriendshipDto);
  }

  @Get()
  findAll() {
    return this.userNpcFriendshipService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userNpcFriendshipService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserNpcFriendshipDto: UpdateUserNpcFriendshipDto) {
    return this.userNpcFriendshipService.update(+id, updateUserNpcFriendshipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userNpcFriendshipService.remove(+id);
  }
}
