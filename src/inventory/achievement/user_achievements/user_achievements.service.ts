import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { UserAchievements } from './entities/user_achievements.entity';
import { AchieveListService } from 'src/static-table/achieve/achieve_list/achieve_list.service';
import { UserAchieveRankingService } from '../user_achieve_ranking/user_achieve_ranking.service';
import { GameLogsService } from 'src/game_log/game_logs/game_logs.service';
import { LogType } from 'src/common/const/log-type.enum';

@Injectable()
export class UserAchievementsService {
  constructor(
    @InjectRepository(UserAchievements)
    private readonly userAchievementsRepository: Repository<UserAchievements>,
    private readonly rewardOfferService: RewardOfferService,
    private readonly achieveListService: AchieveListService,
    private readonly userAchieveRankingService: UserAchieveRankingService,
    private readonly dataSource: DataSource,
    private readonly gameLogsService: GameLogsService,
  ) {}

  getUserAchievementsRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserAchievements>(UserAchievements)
      : this.userAchievementsRepository;
  }

  // async ranking(season: number, qr?: QueryRunner) {
  //   const queryBuilder = (qr ? qr.manager : this.dataSource)
  //     .createQueryBuilder()
  //     .select([
  //       'uar.user_id AS user_id',
  //       'u.nickname AS nickname', // ✅ nickname 추가
  //       'uar.season AS season',
  //       'uar.achieve_point AS achieve_point',
  //       'uar.update_at AS update_at',
  //       'ROW_NUMBER() OVER (ORDER BY uar.achieve_point DESC, uar.update_at ASC) AS rank_position',
  //     ])
  //     .from('user_achieve_ranking', 'uar')
  //     .leftJoin('users', 'u', 'uar.user_id = u.user_id') // ✅ users 테이블과 조인
  //     .where('uar.season = :season', { season })
  //     .limit(100);

  //   const rankQuery = await queryBuilder.getRawMany();
  //   //console.log('🏆 랭킹 조회 결과:', rankQuery);

  //   return rankQuery;
  // }

  async ranking(season: number, qr?: QueryRunner) {
    const achieve = await this.achieveListService.getAchieveSeasonList(
      season,
      qr,
    );

    const achievePointThreshold = Math.ceil((achieve.length / 100) * 95); // 95% 기준점 계산 (올림 적용)

    const queryBuilder = (qr ? qr.manager : this.dataSource)
      .createQueryBuilder()
      .select([
        'uar.user_id AS user_id',
        'uar.season AS season',
        'uar.achieve_point AS achieve_point',
        'uar.update_at AS update_at',
        'ROW_NUMBER() OVER (ORDER BY uar.achieve_point DESC, uar.update_at ASC, uar.user_id ASC) AS rank_position',
      ])
      .from('user_achieve_ranking', 'uar')
      .where('uar.season = :season', { season })
      .andWhere('uar.achieve_point >= :threshold', {
        threshold: achievePointThreshold,
      }) // 95% 이상 필터링
      .limit(100);

    const rankQuery = await queryBuilder.getRawMany();
    //console.log('🏆 랭킹 조회 결과:', rankQuery);

    return rankQuery;
  }

  // async ranking(season: number, qr?: QueryRunner) {
  //   const achieve = await this.achieveListService.getAchieveSeasonList(
  //     season,
  //     qr,
  //   );

  //   achieve.length;

  //   const queryBuilder = (qr ? qr.manager : this.dataSource)
  //     .createQueryBuilder()
  //     .select([
  //       'uar.user_id AS user_id',
  //       'uar.season AS season',
  //       'uar.achieve_point AS achieve_point',
  //       'uar.update_at AS update_at',
  //       'ROW_NUMBER() OVER (ORDER BY uar.achieve_point DESC, uar.update_at ASC) AS rank_position',
  //     ])
  //     .from('user_achieve_ranking', 'uar')
  //     .where('uar.season = :season', { season })
  //     .limit(100);

  //   const rankQuery = await queryBuilder.getRawMany();
  //   //console.log('🏆 랭킹 조회 결과:', rankQuery);

  //   return rankQuery;
  // }

  //특정 (id = 5)의 순위만 가져오기
  async rankingMe(guildId: string, qr?: QueryRunner) {
    const queryRunner = qr || this.dataSource.createQueryRunner(); // QueryRunner 생성 또는 기존 사용

    if (!qr) {
      await queryRunner.connect(); // 새로운 QueryRunner라면 연결
      await queryRunner.startTransaction(); // 트랜잭션 시작
    }

    try {
      const guildRank = await queryRunner.manager
        .createQueryBuilder()
        .select([
          'id',
          'name',
          'score',
          'RANK() OVER (ORDER BY score DESC) AS rank_position',
        ])
        .from((qb) => {
          return qb
            .select([
              'id',
              'name',
              'score',
              'RANK() OVER (ORDER BY score DESC) AS rank_position',
            ])
            .from('guilds', 'g');
        }, 'ranked_guilds')
        .where('ranked_guilds.id = :guildId', { guildId })
        .getRawOne();

      if (!qr) {
        await queryRunner.commitTransaction(); // 트랜잭션 성공 시 커밋
      }

      console.log(guildRank); // ✅ 특정 ID의 순위 출력됨
      return guildRank;
    } catch (error) {
      if (!qr) {
        await queryRunner.rollbackTransaction(); // 오류 발생 시 롤백
      }
      console.error('❌ 랭킹 조회 실패:', error);
      throw error;
    } finally {
      if (!qr) {
        await queryRunner.release(); // QueryRunner 해제
      }
    }
  }

  //DENSE_RANK()는 순위를 건너뛰지 않음 (예: 1, 2, 2, 3)
  async ranking2(qr?: QueryRunner) {
    const queryBuilder = this.dataSource
      .createQueryBuilder()
      .select([
        'id',
        'name',
        'score',
        'DENSE_RANK() OVER (ORDER BY score DESC) AS rank_position',
      ])
      .from('guilds', 'g')
      .limit(100);

    if (qr) {
      queryBuilder.setQueryRunner(qr);
    }

    const rankQuery = await queryBuilder.getRawMany();

    console.log(rankQuery);

    return rankQuery;
  }

  async saveAchieve(
    user_id: string,
    achieve_id: number,
    achieve_count: number,
    progress_status: string,
    qr?: QueryRunner,
  ) {
    if (!user_id || typeof user_id !== 'string') {
      throw new BadRequestException('Invalid user_id provided.');
    }

    const queryRunner = qr || this.dataSource.createQueryRunner();

    let isTransactionOwner = false;
    if (!qr) {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      isTransactionOwner = true;
    }

    try {
      const userAchievementsRepository =
        queryRunner.manager.getRepository(UserAchievements);

      let userAchieve = await userAchievementsRepository.findOne({
        where: { user_id, achieve_id },
      });

      if (!userAchieve) {
        userAchieve = userAchievementsRepository.create({
          user_id,
          achieve_id,
          achieve_count: 0,
          progress_status: 'N', // 기본 상태
        });
      }

      const totalAchieveCount = userAchieve.achieve_count + +achieve_count;

      if (progress_status === 'Y') {
        userAchieve.progress_status = progress_status;
        userAchieve.achieve_count = +totalAchieveCount;
        userAchieve.complete_date = new Date();
      } else {
        userAchieve.achieve_count += +achieve_count;
      }

      const result = await userAchievementsRepository.save(userAchieve);

      await this.achieveRankPointCalcu(
        user_id,
        achieve_id,
        totalAchieveCount,
        qr,
      );

      if (isTransactionOwner) {
        await queryRunner.commitTransaction();
      }

      return result;
    } catch (error) {
      if (isTransactionOwner) {
        await queryRunner.rollbackTransaction();
      }
      console.error('Transaction failed:', error);
      throw new Error(`Transaction failed: ${error.message}`);
    } finally {
      if (isTransactionOwner) {
        await queryRunner.release();
      }
    }
  }

  async achieveRankPointCalcu(
    user_id: string,
    achieve_id: number,
    achieve_count: number,
    qr?: QueryRunner,
  ) {
    const userAchievementsRepository = this.getUserAchievementsRepository(qr);
    const userAchieve = await userAchievementsRepository.findOne({
      where: {
        user_id,
        achieve_id,
      },
    });

    const achieve = await this.achieveListService.getAchieve(achieve_id, qr);

    if (
      userAchieve.point_calcu_yn === 'N' &&
      achieve_count >= achieve.mission_goal
    ) {
      await this.userAchieveRankingService.achievePointPlus(
        user_id,
        achieve.season,
        qr,
      );

      if (achieve_count >= achieve.mission_goal) {
        userAchieve.point_calcu_yn = 'Y';
      }
    }

    const result = await userAchievementsRepository.save(userAchieve);

    return {
      userAchievements: result,
    };
  }

  async achieve(user_id: string, qr?: QueryRunner) {
    const userAchievementsRepository = this.getUserAchievementsRepository(qr);
    const userAchieve = await userAchievementsRepository.findOne({
      where: {
        user_id,
      },
    });

    return userAchieve;
  }

  async getUserAchieveAll(user_id: string, qr?: QueryRunner) {
    const userAchievementsRepository = this.getUserAchievementsRepository(qr);
    const userAchieve = await userAchievementsRepository.find({
      where: {
        user_id,
      },
    });

    return userAchieve;
  }

  async achieveReward(
    user_id: string,
    user_achievements_id: number,
    qr?: QueryRunner,
  ) {
    const userAchievementsRepository = this.getUserAchievementsRepository(qr);
    const userAchieve = await userAchievementsRepository.findOne({
      where: {
        id: user_achievements_id,
        user_id,
      },
    });

    if (!userAchieve) {
      throw new NotFoundException('userAchieve not found.');
    }

    const achieveData = await this.achieveListService.getAchieve(
      userAchieve.achieve_id,
      qr,
    );

    if (userAchieve.reward_yn === 'Y') {
      return {
        code: 0,
        message: `You have already claimed the Achieve reward.`,
        utcTimeString: new Date().toISOString(),
        hasError: false,
      };
    }
    const rewardData = await this.rewardOfferService.reward(
      user_id,
      achieveData.reward_id,
      qr,
    );

    if (!rewardData) {
      return {
        code: 0,
        message: `Failed to process reward.`,
        utcTimeString: new Date().toISOString(),
        hasError: false,
      };
    }

    userAchieve.reward_yn = 'Y';
    const updatedUserAchieve =
      await userAchievementsRepository.save(userAchieve);

    // 업적 로그
    const achievementLog = {
      user_achievements_id,
      userItemData: rewardData,
      userAchieve: updatedUserAchieve,
    };

    await this.gameLogsService.insertLog(
      LogType.PLAYER_ACHIEVEMENT_REWARD,
      user_id,
      achievementLog,
    );

    return {
      reward: {
        userItemData: rewardData,
      },

      userAchievement: updatedUserAchieve,
    };
  }
}
