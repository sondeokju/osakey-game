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

  async getUserNpcFriendship(user_id: string, qr?: QueryRunner) {
    const userNpcFriendshipRepository = this.getUserNpcFriendshipRepository(qr);
    const userNpcFriendship = await userNpcFriendshipRepository.find({
      where: { user_id },
    });

    return userNpcFriendship;
  }

  async addNpcLikeability(
    user_id: string,
    user_suit_id: number,
    npc_likeability: number,
    qr?: QueryRunner,
  ) {
    const userNpcFriendshipRepository = this.getUserNpcFriendshipRepository(qr);
    const userNpcFriendship = await userNpcFriendshipRepository.findOne({
      where: { id: user_suit_id, user_id },
    });

    if (!userNpcFriendship) {
      throw new NotFoundException('UserNpcFriendship not found');
    }

    userNpcFriendship.npc_likeability += npc_likeability;
    const result = await userNpcFriendshipRepository.save(userNpcFriendship);

    return result;
  }
}
