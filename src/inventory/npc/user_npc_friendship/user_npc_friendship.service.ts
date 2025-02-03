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
    npc_id: number,
    npc_likeability: number,
    qr?: QueryRunner,
  ) {
    const userNpcFriendshipRepository = this.getUserNpcFriendshipRepository(qr);
    let userNpcFriendship = await userNpcFriendshipRepository.findOne({
      where: { user_id, npc_id },
    });

    if (!userNpcFriendship) {
      userNpcFriendship = userNpcFriendshipRepository.create({
        user_id,
        npc_id,
        npc_likeability: 0, // 기본 호감도를 0으로 설정
      });
    }

    userNpcFriendship.npc_likeability += +npc_likeability;
    const result = await userNpcFriendshipRepository.save(userNpcFriendship);

    return result;
  }
}
