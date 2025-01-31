import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserSuit } from './entities/user_suit.entity';

@Injectable()
export class UserSuitService {
  constructor(
    @InjectRepository(UserSuit)
    private readonly userSuitRepository: Repository<UserSuit>, //private readonly rewardOfferService: RewardOfferService,
  ) {}

  getUserSuitRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserSuit>(UserSuit)
      : this.userSuitRepository;
  }

  //슈트 레벨업
  async suitLevelUp(user_id: string, user_suit_id: number, qr?: QueryRunner) {
    const userSuitRepository = this.getUserSuitRepository(qr);
    const userSuit = await userSuitRepository.findOne({
      where: { id: user_suit_id, user_id },
    });

    if (!userSuit) {
      throw new NotFoundException('User suit not found');
    }

    userSuit.suit_level += 1;
    const result = await userSuitRepository.save(userSuit);

    return result;
  }

  // 슈트 필살기 레벨업
  async suitSpecialLevelUp(
    user_id: string,
    user_suit_id: number,
    qr?: QueryRunner,
  ) {
    const userSuitRepository = this.getUserSuitRepository(qr);
    const userSuit = await userSuitRepository.findOne({
      where: { id: user_suit_id, user_id },
    });

    if (!userSuit) {
      throw new NotFoundException('User suit not found');
    }

    userSuit.suit_special_level += 1;
    const result = await userSuitRepository.save(userSuit);

    return result;
  }

  // 슈트 조각으로 슈트 해금
  async unlockSuitWithSuitPieces(
    user_id: string,
    user_suit_id: number,
    qr?: QueryRunner,
  ) {
    const userSuitRepository = this.getUserSuitRepository(qr);
    const userSuit = await userSuitRepository.findOne({
      where: { id: user_suit_id, user_id },
    });

    if (!userSuit) {
      throw new NotFoundException('User suit not found');
    }

    userSuit.unlock_yn = 'Y';
    const result = await userSuitRepository.save(userSuit);

    return result;
  }

  async getUserSuit(user_id: string, qr?: QueryRunner) {
    const userSuitRepository = this.getUserSuitRepository(qr);
    const userSuit = await userSuitRepository.find({
      where: { user_id },
    });

    return userSuit;
  }

  // async eduLearn(user_id: string, edu_list_id: number, qr?: QueryRunner) {
  //   const userSuitRepository = this.getUserSuitRepository(qr);

  //   // 교육 리스트 확인
  //   const eduList = await this.eduListService.getEduList(edu_list_id, qr);
  //   if (!eduList) {
  //     throw new NotFoundException('edu_list not found');
  //   }
  //   console.log(eduList);

  //   // 사용자 교육 상태 조회
  //   const userEduStats = await userEduStatsRepository.findOne({
  //     where: { user_id, edu_list_id },
  //   });

  //   // 새 교육 과정 생성
  //   if (!userEduStats) {
  //     return this.createEduLearn(user_id, eduList, qr);
  //   }

  //   // 기존 교육 과정 업데이트
  //   if (userEduStats.edu_curriculum_cnt >= eduList.edu_curriculum_max) {
  //     throw new NotFoundException('edu_curriculum_max over');
  //   }

  //   return this.updateEduLearn(user_id, eduList, userEduStats, qr);
  // }

  // private async createEduLearn(
  //   user_id: string,
  //   eduList: any,
  //   qr?: QueryRunner,
  // ) {
  //   console.log('eduList', eduList);
  //   const eduCurriculum = await this.eduCurriculumService.getEduCurriculum(
  //     eduList.edu_list_id,
  //     1,
  //     qr,
  //   );

  //   const updatedDate = new Date();
  //   updatedDate.setMilliseconds(0);

  //   await this.getUserEduStatsRepository(qr).insert({
  //     user_id,
  //     edu_list_id: eduList.edu_list_id,
  //     edu_type: eduList.edu_type,
  //     edu_curriculum_cnt: 1,
  //     edu_buff_type: eduList.edu_buff_type,
  //     edu_buff_value: eduList.edu_buff_value,
  //     edu_time: eduCurriculum.edu_time,
  //     edu_start_date: updatedDate,
  //     edu_end_date: new Date(
  //       updatedDate.getTime() + eduCurriculum.edu_time * 60000,
  //     ),
  //   });

  //   await this.processResources(user_id, eduCurriculum, qr);
  //   return this.getUserEduStatsRepository(qr).find({ where: { user_id } });
  // }

  // private async updateEduLearn(
  //   user_id: string,
  //   eduList: any,
  //   userEduStats: any,
  //   qr?: QueryRunner,
  // ) {
  //   const nextCurriculumCnt = userEduStats.edu_curriculum_cnt + 1;
  //   const eduCurriculum = await this.eduCurriculumService.getEduCurriculum(
  //     eduList.id,
  //     nextCurriculumCnt,
  //     qr,
  //   );

  //   if (userEduStats.edu_learn_yn === 'N') {
  //     return this.getUserEduStatsRepository(qr).find({ where: { user_id } });
  //   }
  //   // Update education end date
  //   const eduEndDate = new Date();
  //   eduEndDate.setMinutes(eduEndDate.getMinutes() + eduCurriculum.edu_time);

  //   await this.getUserEduStatsRepository(qr).save({
  //     ...userEduStats,
  //     edu_curriculum_cnt: nextCurriculumCnt,
  //     edu_buff_value: userEduStats.edu_buff_value + eduList.edu_buff_value,
  //     edu_start_date: new Date(),
  //     edu_end_date: eduEndDate,
  //     edu_learn_yn: 'N',
  //   });

  //   await this.processResources(user_id, eduCurriculum, qr);
  //   return this.getUserEduStatsRepository(qr).find({ where: { user_id } });
  // }

  // private async processResources(
  //   user_id: string,
  //   eduCurriculum: any,
  //   qr?: QueryRunner,
  // ) {
  //   console.log(eduCurriculum.price_item_id);
  //   // const item = await this.itemService.getItem(
  //   //   eduCurriculum.price_item_id,
  //   //   qr,
  //   // );
  //   // if (!item) {
  //   //   throw new NotFoundException('item not found');
  //   // }

  //   if (eduCurriculum.price_item_id > 0) {
  //     await this.userItemService.reduceItem(
  //       user_id,
  //       eduCurriculum.price_item_id,
  //       eduCurriculum.price_item_qty,
  //     );
  //   }

  //   const userData = await this.usersService.getMe(user_id, qr);

  //   if (eduCurriculum.gord > 0) {
  //     if (userData.gord < eduCurriculum.gord) {
  //       throw new BadRequestException('gord not enough');
  //     }
  //     await this.usersService.reduceGord(user_id, eduCurriculum.gord, qr);
  //   }

  //   if (eduCurriculum.diamond_free > 0) {
  //     if (userData.diamond_free < eduCurriculum.diamond_free) {
  //       throw new BadRequestException('diamond_free not enough');
  //     }
  //     await this.usersService.reduceDiamondFree(
  //       user_id,
  //       eduCurriculum.diamond_free,
  //       qr,
  //     );
  //   }
  // }

  // async reduceLearnTimeItem(
  //   user_id: string,
  //   edu_list_id: number,
  //   edu_reduce_time_id: number,
  //   qr?: QueryRunner,
  // ) {
  //   const userEduStatsRepository = this.getUserEduStatsRepository(qr);
  //   const userEduStats = await userEduStatsRepository.findOne({
  //     where: {
  //       user_id,
  //       edu_list_id,
  //     },
  //   });

  //   if (!userEduStats) {
  //     throw new NotFoundException('user_edu_stats not found');
  //   }

  //   const eduReduceTime = await this.eduReduceTimeService.getEduReduceTime(
  //     edu_reduce_time_id,
  //     qr,
  //   );

  //   if (!eduReduceTime) {
  //     throw new NotFoundException('edu_reduce_time not found');
  //   }
  //   const item = await this.itemService.getItem(
  //     eduReduceTime.reduce_item_id,
  //     qr,
  //   );
  //   if (!item) {
  //     throw new NotFoundException('item not found');
  //   }

  //   await this.userItemService.reduceItem(
  //     user_id,
  //     eduReduceTime.reduce_item_id,
  //     1,
  //   );

  //   const updatedDate = new Date();
  //   updatedDate.setMilliseconds(0);

  //   // Update education end date
  //   const eduEndDate = new Date(userEduStats.edu_end_date);
  //   eduEndDate.setMinutes(eduEndDate.getMinutes() - eduReduceTime.reduce_time);

  //   await userEduStatsRepository.save({
  //     ...userEduStats,
  //     edu_end_date: eduEndDate,
  //   });

  //   const result = await userEduStatsRepository.find({
  //     where: {
  //       user_id,
  //     },
  //   });

  //   return result;
  // }

  // async reduceLearnTimeCurrency(
  //   user_id: string,
  //   edu_list_id: number,
  //   edu_reduce_time_id: number,
  //   qr?: QueryRunner,
  // ) {
  //   const userEduStatsRepository = this.getUserEduStatsRepository(qr);
  //   const userEduStats = await userEduStatsRepository.findOne({
  //     where: {
  //       user_id,
  //       edu_list_id,
  //     },
  //   });

  //   if (!userEduStats) {
  //     throw new NotFoundException('user_edu_stats not found');
  //   }

  //   const eduReduceTime = await this.eduReduceTimeService.getEduReduceTime(
  //     edu_reduce_time_id,
  //     qr,
  //   );

  //   if (!eduReduceTime) {
  //     throw new NotFoundException('edu_reduce_time not found');
  //   }
  //   const item = await this.itemService.getItem(
  //     eduReduceTime.reduce_item_id,
  //     qr,
  //   );
  //   if (!item) {
  //     throw new NotFoundException('item not found');
  //   }

  //   const userData = await this.usersService.getMe(user_id, qr);
  //   if (
  //     userData.gord < eduReduceTime.gord ||
  //     userData.diamond_free < eduReduceTime.diamond_free
  //   ) {
  //     throw new NotFoundException('gord, diamond_free not enough');
  //   }
  //   await this.usersService.reduceGord(user_id, eduReduceTime.gord, qr);

  //   await this.usersService.reduceDiamondFree(
  //     user_id,
  //     eduReduceTime.diamond_free,
  //     qr,
  //   );

  //   // Update education end date
  //   const eduEndDate = new Date(userEduStats.edu_end_date);
  //   eduEndDate.setMinutes(eduEndDate.getMinutes() - eduReduceTime.reduce_time);

  //   await userEduStatsRepository.save({
  //     ...userEduStats,
  //     edu_end_date: eduEndDate,
  //   });

  //   const updateData = await userEduStatsRepository.find({
  //     where: {
  //       user_id,
  //     },
  //   });

  //   const result = {
  //     gord: eduReduceTime.gord,
  //     diamond_free: eduReduceTime.diamond_free,
  //     user_edu: updateData,
  //   };

  //   return result;
  // }

  // async learnComplete(user_id: string, edu_list_id: number, qr?: QueryRunner) {
  //   const userEduStatsRepository = this.getUserEduStatsRepository(qr);
  //   const userEduStats = await userEduStatsRepository.findOne({
  //     where: {
  //       user_id,
  //       edu_list_id,
  //     },
  //   });

  //   if (!userEduStats) {
  //     throw new NotFoundException('user_edu_stats not found');
  //   }

  //   await userEduStatsRepository.save({
  //     ...userEduStats,
  //     edu_learn_yn: 'Y',
  //   });

  //   const result = await userEduStatsRepository.find({
  //     where: {
  //       user_id,
  //     },
  //   });

  //   return result;
  // }

  // async userEduList(user_id: string, qr?: QueryRunner) {
  //   const userEduStatsRepository = this.getUserEduStatsRepository(qr);
  //   const userEduStats = await userEduStatsRepository.find({
  //     where: {
  //       user_id,
  //     },
  //   });

  //   // if (!userEduStats) {
  //   //   throw new NotFoundException('user_edu_stats not found');
  //   // }

  //   //return JSON.stringify(userEduStats);
  //   return userEduStats;
  // }
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
