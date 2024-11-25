import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserSnsFollow } from './entities/user_sns_follow.entity';

@Injectable()
export class UserSnsFollowService {
  constructor(
    @InjectRepository(UserSnsFollow)
    private readonly userSnsFollowRepository: Repository<UserSnsFollow>,
    private readonly snsConfigService: SnsConfigService,
  ) {}

  getUserSnsFollowRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserSnsFollow>(UserSnsFollow)
      : this.userSnsFollowRepository;
  }

  async followAdd(user_id: number, follow_user_id: number, qr?: QueryRunner) {
    const userSnsFollowRepository = this.getUserSnsFollowRepository(qr);
    const userSnsFollowData = await userSnsFollowRepository.findOne({
      where: {
        user_id,
        follow_user_id,
      },
    });

    const followCount = await userSnsFollowRepository.count({
      where: {
        user_id,
      },
    });

    const snsConfig = await this.snsConfigService.getSnsConfig('follow_max');

    if (followCount === snsConfig.option) {
      return { message: 'follow over 15' };
    }

    if (!userSnsFollowData) {
      await userSnsFollowRepository.save({
        ...userSnsFollowData,
        user_id,
        follow_user_id,
        follow_yn: 'Y',
      });
    }
    const result = await userSnsFollowRepository.findOne({
      where: {
        user_id,
        follow_user_id,
      },
    });

    return result;
  }

  async unFollow(user_id: number, follow_user_id: number, qr?: QueryRunner) {
    const userSnsFollowRepository = this.getUserSnsFollowRepository(qr);
    const userSnsFollowData = await userSnsFollowRepository.findOne({
      where: {
        user_id,
        follow_user_id,
      },
    });

    if (userSnsFollowData) {
      await userSnsFollowRepository.save({
        ...userSnsFollowData,
        follow_yn: 'N',
      });
    }

    const result = await userSnsFollowRepository.findOne({
      where: {
        user_id,
        follow_user_id,
      },
    });

    return result;
  }
  async followList(user_id: number, qr?: QueryRunner) {
    const userSnsFollowRepository = this.getUserSnsFollowRepository(qr);
    const userSnsFollowData = await userSnsFollowRepository.find({
      where: {
        user_id,
      },
    });

    return userSnsFollowData;
  }
}
