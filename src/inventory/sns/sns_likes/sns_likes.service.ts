import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { SnsLikes } from './entities/sns_likes.entity';

@Injectable()
export class SnsLikesService {
  constructor(
    @InjectRepository(SnsLikes)
    private readonly snsLikesRepository: Repository<SnsLikes>,
  ) {}

  getSnslikesRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<SnsLikes>(SnsLikes)
      : this.snsLikesRepository;
  }

  async isLiked(
    user_id: number,
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
    user_id: number,
    tuna_tv_id: number,
    qr?: QueryRunner,
  ): Promise<void> {
    const snsLikesRepository = this.getSnslikesRepository(qr);
    await snsLikesRepository.save({
      user_id,
      tuna_tv_id,
    });
  }
}
