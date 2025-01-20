import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserNpcFriendship } from './entities/user_npc_friendship.entity';

@Injectable()
export class UserNpcFriendshipService {
  constructor(
    @InjectRepository(UserNpcFriendship)
    private readonly userNpcFriendshipRepository: Repository<UserNpcFriendship>,
  ) {}

  getUserNpcFriendshipRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserNpcFriendship>(UserNpcFriendship)
      : this.userNpcFriendshipRepository;
  }
}
