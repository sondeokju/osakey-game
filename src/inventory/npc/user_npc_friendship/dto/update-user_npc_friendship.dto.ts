import { PartialType } from '@nestjs/mapped-types';
import { CreateUserNpcFriendshipDto } from './create-user_npc_friendship.dto';

export class UpdateUserNpcFriendshipDto extends PartialType(CreateUserNpcFriendshipDto) {}
