import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserEduStats } from './entities/user_edu_stats.entity';
import { EduListService } from 'src/static-table/edu/edu_list/edu_list.service';
import { EduCurriculumService } from 'src/static-table/edu/edu_curriculum/edu_curriculum.service';
import { EduReduceTimeService } from 'src/static-table/edu/edu_reduce_time/edu_reduce_time.service';
import { ItemService } from 'src/static-table/item/item.service';
//import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { UserItemService } from 'src/user_item/user_item.service';
import { UsersService } from 'src/users/users.service';
import { DataSource } from 'typeorm';
import { UserChallengeService } from 'src/inventory/challenge/user_challenge/user_challenge.service';

@Injectable()
export class UserEduStatsService {
  constructor(
    @InjectRepository(UserEduStats)
    private readonly userEduStatsRepository: Repository<UserEduStats>,
    private readonly eduListService: EduListService,
    private readonly eduCurriculumService: EduCurriculumService,
    private readonly eduReduceTimeService: EduReduceTimeService,
    private readonly itemService: ItemService,
    //private readonly rewardOfferService: RewardOfferService,
    private readonly userItemService: UserItemService,
    private readonly usersService: UsersService,
    private readonly userChallengeService: UserChallengeService,
    private readonly dataSource: DataSource,
  ) {}

  getUserEduStatsRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserEduStats>(UserEduStats)
      : this.userEduStatsRepository;
  }

  async eduLearn(user_id: string, edu_list_id: number, qr?: QueryRunner) {
    const userEduStatsRepository = this.getUserEduStatsRepository(qr);

    // 교육 리스트 확인
    const eduList = await this.eduListService.getEduList(edu_list_id, qr);
    if (!eduList) {
      throw new NotFoundException('edu_list not found');
    }

    // 사용자 교육 상태 조회
    const userEduStats = await userEduStatsRepository.findOne({
      where: { user_id, edu_list_id },
    });

    let eduCurriculum;
    let price_item_qty;

    // 새 교육 과정 생성
    if (!userEduStats) {
      eduCurriculum = await this.eduCurriculumService.getEduCurriculum(
        eduList.edu_list_id,
        1,
        qr,
      );

      price_item_qty = eduCurriculum.price_item_qty;

      await this.createEduLearn(user_id, eduList, qr);
      const edu = await userEduStatsRepository.findOne({
        where: { user_id, edu_list_id },
      });

      const user = await this.usersService.getMe(user_id, qr);

      return {
        reward: {
          userItemData: [
            {
              item_id: eduCurriculum.price_item_id,
              item_count: Math.max(-price_item_qty, 0),
            },
          ],
        },
        edu,
        user,
      };
    } else {
      // 기존 교육 과정 업데이트
      if (userEduStats.edu_curriculum_cnt >= eduList.edu_curriculum_max) {
        return {
          code: 0,
          message: `${userEduStats.edu_curriculum_cnt} 교육 커리큘럼이 edu_curriculum_max 값을 초과 했습니다. `,
          utcTimeString: new Date().toISOString(),
          hasError: false,
        };
      }

      await this.updateEduLearn(user_id, edu_list_id, userEduStats, qr);

      eduCurriculum = await this.eduCurriculumService.getEduCurriculum(
        eduList.edu_list_id,
        userEduStats.edu_curriculum_cnt,
        qr,
      );
      price_item_qty = eduCurriculum.price_item_qty;
    }

    const edu = await userEduStatsRepository.findOne({
      where: { user_id, edu_list_id },
    });

    const user = await this.usersService.getMe(user_id, qr);
    return {
      reward: {
        userItemData: [
          {
            item_id: eduCurriculum.price_item_id,
            item_count: Math.max(-price_item_qty, 0),
          },
        ],
      },
      edu,
      user,
    };
  }

  private async createEduLearn(
    user_id: string,
    eduList: any,
    qr?: QueryRunner,
  ) {
    console.log('eduList', eduList);
    const eduCurriculum = await this.eduCurriculumService.getEduCurriculum(
      eduList.edu_list_id,
      1,
      qr,
    );

    const updatedDate = new Date();
    updatedDate.setMilliseconds(0);

    await this.getUserEduStatsRepository(qr).insert({
      user_id,
      edu_list_id: eduList.edu_list_id,
      edu_type: eduList.edu_type.trim(),
      edu_curriculum_cnt: 1,
      edu_buff_type: eduList.edu_buff_type.trim(),
      edu_buff_value: eduList.edu_buff_value,
      edu_time: eduCurriculum.edu_time,
      edu_start_date: updatedDate,
      edu_end_date: new Date(
        updatedDate.getTime() + eduCurriculum.edu_time * 60000,
      ),
    });

    await this.processResources(user_id, eduCurriculum, qr);
  }

  private async updateEduLearn(
    user_id: string,
    edu_list_id: number,
    userEduStats: any,
    qr?: QueryRunner,
  ) {
    const nextCurriculumCnt = userEduStats.edu_curriculum_cnt + 1;
    const eduCurriculum = await this.eduCurriculumService.getEduCurriculum(
      edu_list_id,
      nextCurriculumCnt,
      qr,
    );

    const eduList = await this.eduListService.getEduList(edu_list_id, qr);
    if (!eduList) {
      return {
        code: 0,
        message: `edu_list 테이블에 ${edu_list_id} 값이 없습니다. `,
        utcTimeString: new Date().toISOString(),
        hasError: false,
      };
    }

    if (userEduStats.edu_learn_yn === 'N') {
      return this.getUserEduStatsRepository(qr).find({ where: { user_id } });
    }
    // Update education end date
    const eduEndDate = new Date();
    eduEndDate.setMilliseconds(0);
    //eduEndDate.setMinutes(eduEndDate.getMinutes() + eduCurriculum.edu_time);

    console.log('eduCurriculum:', eduCurriculum);
    console.log('eduCurriculum.edu_time:', eduCurriculum.edu_time);
    console.log(
      'edu_end_date:',
      new Date(eduEndDate.getTime() + eduCurriculum.edu_time * 60000),
    );

    await this.getUserEduStatsRepository(qr).save({
      ...userEduStats,
      edu_curriculum_cnt: nextCurriculumCnt,
      edu_buff_value: userEduStats.edu_buff_value + eduList.edu_buff_value,
      edu_start_date: new Date(),
      edu_end_date: new Date(
        eduEndDate.getTime() + eduCurriculum.edu_time * 60000,
      ),
      edu_learn_yn: 'N',
    });

    await this.processResources(user_id, eduCurriculum, qr);
    return this.getUserEduStatsRepository(qr).find({ where: { user_id } });
  }

  private async processResources(
    user_id: string,
    eduCurriculum: any,
    qr?: QueryRunner,
  ) {
    console.log(eduCurriculum.price_item_id);
    // const item = await this.itemService.getItem(
    //   eduCurriculum.price_item_id,
    //   qr,
    // );
    // if (!item) {
    //   throw new NotFoundException('item not found');
    // }

    if (eduCurriculum.price_item_id > 0) {
      await this.userItemService.reduceItem(
        user_id,
        eduCurriculum.price_item_id,
        eduCurriculum.price_item_qty,
      );
    }

    const userData = await this.usersService.getMe(user_id, qr);

    if (eduCurriculum.gord > 0) {
      if (userData.gord < eduCurriculum.gord) {
        return {
          code: 0,
          message: `유저의 gord: ${eduCurriculum.gord} 충분하지 않습니다.`,
          utcTimeString: new Date().toISOString(),
          hasError: false,
        };
      }
      await this.usersService.reduceGord(user_id, eduCurriculum.gord, qr);
    }
    await this.usersService.deductDiamonds(
      user_id,
      eduCurriculum.diamond_free,
      'mixed',
      qr,
    );

    // if (eduCurriculum.diamond_free > 0) {
    //   if (userData.diamond_free < eduCurriculum.diamond_free) {
    //     throw new BadRequestException('diamond_free not enough');
    //   }
    //   await this.usersService.deductDiamonds(
    //     user_id,
    //     eduCurriculum.diamond_free,
    //     'mixed',
    //     qr,
    //   );
    //   // await this.usersService.reduceDiamondFree(
    //   //   user_id,
    //   //   eduCurriculum.diamond_free,
    //   //   qr,
    //   // );
    // }
  }

  async reduceLearnTimeItem(
    user_id: string,
    edu_list_id: number,
    edu_reduce_time_id: number,
    qr?: QueryRunner,
  ) {
    const userEduStatsRepository = this.getUserEduStatsRepository(qr);
    const userEduStats = await userEduStatsRepository.findOne({
      where: {
        user_id,
        edu_list_id,
      },
    });

    if (!userEduStats) {
      throw new NotFoundException('user_edu_stats not found');
    }

    const eduReduceTime = await this.eduReduceTimeService.getEduReduceTime(
      edu_reduce_time_id,
      qr,
    );

    if (!eduReduceTime) {
      throw new NotFoundException('edu_reduce_time not found');
    }
    const item = await this.itemService.getItem(
      eduReduceTime.reduce_item_id,
      qr,
    );
    if (!item) {
      throw new NotFoundException('item not found');
    }

    await this.userItemService.reduceItem(
      user_id,
      eduReduceTime.reduce_item_id,
      1,
    );

    const updatedDate = new Date();
    updatedDate.setMilliseconds(0);

    // Update education end date
    const eduEndDate = new Date(userEduStats.edu_end_date);
    eduEndDate.setMinutes(eduEndDate.getMinutes() - eduReduceTime.reduce_time);

    await userEduStatsRepository.save({
      ...userEduStats,
      edu_end_date: eduEndDate,
    });

    const userEduData = await userEduStatsRepository.find({
      where: {
        user_id,
      },
    });

    return {
      reward: {
        userItemData: [{ item_id: item.item_id, item_count: -1 }],
      },
      userEduData,
    };
  }

  async reduceLearnTimeCurrency(
    user_id: string,
    edu_list_id: number,
    edu_reduce_time_id: number,
    qr?: QueryRunner,
  ) {
    let queryRunner: QueryRunner | undefined = qr;
    let isTransactionStarted = false;

    if (!queryRunner) {
      queryRunner = this.dataSource.createQueryRunner();
      await queryRunner.connect();
      await queryRunner.startTransaction();
      isTransactionStarted = true;
    }

    try {
      const userEduStatsRepository =
        this.getUserEduStatsRepository(queryRunner);
      const userEduStats = await userEduStatsRepository.findOne({
        where: {
          user_id,
          edu_list_id,
        },
      });

      if (!userEduStats) {
        throw new NotFoundException('user_edu_stats not found');
      }

      const eduReduceTime = await this.eduReduceTimeService.getEduReduceTime(
        edu_reduce_time_id,
        queryRunner,
      );

      if (!eduReduceTime) {
        throw new NotFoundException('edu_reduce_time not found');
      }

      const item = await this.itemService.getItem(
        eduReduceTime.reduce_item_id,
        queryRunner,
      );
      if (!item) {
        throw new NotFoundException('item not found');
      }

      const userData = await this.usersService.getMe(user_id, queryRunner);
      if (
        userData.gord < eduReduceTime.gord ||
        userData.diamond_free < eduReduceTime.diamond_free
      ) {
        throw new NotFoundException('gord, diamond_free not enough');
      }

      await this.usersService.reduceGord(
        user_id,
        eduReduceTime.gord,
        queryRunner,
      );
      await this.usersService.deductDiamonds(
        user_id,
        eduReduceTime.diamond_free,
        'mixed',
        queryRunner,
      );

      // Update education end date
      const eduEndDate = new Date(userEduStats.edu_end_date);
      eduEndDate.setMinutes(
        eduEndDate.getMinutes() - eduReduceTime.reduce_time,
      );

      await userEduStatsRepository.save({
        ...userEduStats,
        edu_end_date: eduEndDate,
      });

      const userEduData = await userEduStatsRepository.find({
        where: {
          user_id,
        },
      });

      const result = {
        userItemData: [
          { item_id: 11100004, item_count: eduReduceTime.diamond_free },
          { item_id: 11100002, item_count: eduReduceTime.gord },
        ],
      };

      if (isTransactionStarted) {
        await queryRunner.commitTransaction();
      }

      return { reward: { result }, userEduData };
    } catch (error) {
      if (isTransactionStarted) {
        await queryRunner.rollbackTransaction();
      }
      throw error;
    } finally {
      if (isTransactionStarted) {
        await queryRunner.release();
      }
    }
  }

  async learnComplete(user_id: string, edu_list_id: number, qr?: QueryRunner) {
    const userEduStatsRepository = this.getUserEduStatsRepository(qr);
    const userEduStats = await userEduStatsRepository.findOne({
      where: {
        user_id,
        edu_list_id,
      },
    });

    if (!userEduStats) {
      return {
        code: 0,
        message: `curriculum_id ${edu_list_id} 해당 교육이 없습니다.`,
        utcTimeString: new Date().toISOString(),
        hasError: false,
      };
    }

    await userEduStatsRepository.save({
      ...userEduStats,
      edu_learn_yn: 'Y',
    });

    const result = await userEduStatsRepository.find({
      where: {
        user_id,
      },
    });

    // 수업 듣기 완료 퀘스트
    await this.userChallengeService.challengeQuest(user_id, 12400005, 1);

    return result;
  }

  async userEduList(user_id: string, qr?: QueryRunner) {
    const userEduStatsRepository = this.getUserEduStatsRepository(qr);
    const userEduStats = await userEduStatsRepository.find({
      where: {
        user_id,
      },
    });

    // if (!userEduStats) {
    //   throw new NotFoundException('user_edu_stats not found');
    // }

    //return JSON.stringify(userEduStats);
    return userEduStats;
  }
}

// const rewards = [
//   { type: 'gord', qty: eduReduceTime.gord },
//   { type: 'diamond_free', qty: eduReduceTime.diamond_free },
// ];

// let rewardItem = {};
// for (const reward of rewards) {
//   rewardItem = await this.rewardOfferService.rewardCurrency(
//     user_id,
//     reward.type,
//     reward.qty,
//   );
// }
