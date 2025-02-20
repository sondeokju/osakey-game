import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserSnsLikes } from './entities/user_sns_likes.entity';

@Injectable()
export class UserSnsLikesService {
  constructor(
    @InjectRepository(UserSnsLikes)
    private readonly snsLikesRepository: Repository<UserSnsLikes>,
  ) {}

  getSnslikesRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserSnsLikes>(UserSnsLikes)
      : this.snsLikesRepository;
  }

  async isLiked(
    user_id: string,
    tuna_tv_id: number,
    qr?: QueryRunner,
  ): Promise<boolean> {
    const userSnsFollowRepository = this.getSnslikesRepository(qr);
    const exists = await userSnsFollowRepository.findOne({
      where: { user_id, tuna_tv_id },
    });
    return exists !== null;
  }

  async addLike(
    user_id: string,
    tuna_tv_id: number,
    qr?: QueryRunner,
  ): Promise<void> {
    const snsLikesRepository = this.getSnslikesRepository(qr);
    await snsLikesRepository.insert({
      tuna_tv_id,
      user_id,
    });
  }

  async deleteLike(
    user_id: string,
    tuna_tv_id: number,
    qr?: QueryRunner,
  ): Promise<void> {
    const snsLikesRepository = this.getSnslikesRepository(qr);
    await snsLikesRepository.delete({
      user_id,
      tuna_tv_id,
    });
  }
}
