import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserSnsFollow } from './entities/user_sns_follow.entity';
import { SnsConfigService } from 'src/static-table/sns/sns_config/sns_config.service';

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

  // async followList(user_id: number, qr?: QueryRunner) {
  //   const userSnsFollowRepository = this.getUserSnsFollowRepository(qr);
  //   const userSnsFollowData = await userSnsFollowRepository.find({
  //     where: {
  //       user_id,
  //     },
  //   });

  //   return userSnsFollowData;
  // }

  async followList(user_id: number, qr?: QueryRunner) {
    const userSnsFollowRepository = this.getUserSnsFollowRepository(qr);
    const userSnsFollowData = await userSnsFollowRepository.find({});

    if (!userSnsFollowData || userSnsFollowData.length === 0) {
      console.log('No follow users found.');
      return;
    }

    const result = await userSnsFollowRepository
      .createQueryBuilder('user_sns_follow')
      .select('user_sns_follow.user_id', 'user_id')
      .addSelect('user_sns_follow.follow_user_id', 'follow_user_id')
      .addSelect((qb) => {
        return qb
          .subQuery()
          .select('MAX(inner_follow.update_at)')
          .from('user_sns_follow', 'inner_follow')
          .where('inner_follow.user_id = user_sns_follow.user_id')
          .groupBy('inner_follow.user_id'); // user_id 기준 그룹화
      }, 'user_update_at') // user_id의 최신 update_at
      .addSelect((qb) => {
        return qb
          .subQuery()
          .select('MAX(inner_follow.update_at)')
          .from('user_sns_follow', 'inner_follow')
          .where('inner_follow.follow_user_id = user_sns_follow.follow_user_id')
          .groupBy('inner_follow.follow_user_id'); // follow_user_id 기준 그룹화
      }, 'follow_update_at') // follow_user_id의 최신 update_at
      .addSelect('follow_user.nickname', 'follow_nickname') // follow_user의 닉네임
      .addSelect('follow_user.level', 'follow_level') // follow_user의 레벨
      .innerJoin(
        'users',
        'follow_user',
        'follow_user.id = user_sns_follow.follow_user_id',
      ) // follow_user_id와 users 조인
      .getRawMany();

    // const result = await userSnsFollowRepository
    //   .createQueryBuilder('user_sns_follow')
    //   .select('user_sns_follow.user_id', 'user_id')
    //   .addSelect('user_sns_follow.follow_user_id', 'follow_user_id')
    //   .addSelect((subQuery) => {
    //     return subQuery
    //       .select('inner_follow.update_at')
    //       .from('user_sns_follow', 'inner_follow')
    //       .where('inner_follow.user_id = user_sns_follow.user_id');
    //   }, 'user_update_at') // user_id의 최신 update_at
    //   .addSelect((subQuery) => {
    //     return subQuery
    //       .select('inner_follow.update_at')
    //       .from('user_sns_follow', 'inner_follow')
    //       .where(
    //         'inner_follow.follow_user_id = user_sns_follow.follow_user_id',
    //       );
    //   }, 'follow_update_at') // follow_user_id의 최신 update_at
    //   .addSelect('follow_user.nickname', 'follow_nickname') // follow_user의 닉네임
    //   .addSelect('follow_user.level', 'follow_level') // follow_user의 레벨
    //   .innerJoin(
    //     'users',
    //     'follow_user',
    //     'follow_user.id = user_sns_follow.follow_user_id',
    //   ) // follow_user_id와 users 조인
    //   .getRawMany();

    return result;
  }
}
