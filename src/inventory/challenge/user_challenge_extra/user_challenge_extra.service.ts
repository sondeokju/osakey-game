import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { DataSource } from 'typeorm';
import { UserChallengeExtra } from './entities/user_challenge_extra.entity';

@Injectable()
export class UserChallengeExtraService {
  constructor(
    @InjectRepository(UserChallengeExtra)
    private readonly userChallengeExtraRepository: Repository<UserChallengeExtra>,
    private readonly dataSource: DataSource,
  ) {}

  getUserChallengeExtraRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserChallengeExtra>(UserChallengeExtra)
      : this.userChallengeExtraRepository;
  }

  async getUserChallengeExtraAll(user_id: string, qr?: QueryRunner) {
    const userChallengeExtraRepository =
      this.getUserChallengeExtraRepository(qr);

    const userChallengeExtra = await userChallengeExtraRepository.find({
      where: { user_id },
    });

    return userChallengeExtra;
  }

  // async challengeQuest(
  //   user_id: string,
  //   mission_routine_id: number,
  //   count: number,
  //   qr?: QueryRunner,
  // ) {
  //   const userChallengeRepository = this.getUserChallengeRepository(qr);

  //   let userChallenge = await userChallengeRepository.findOne({
  //     where: { user_id, mission_routine_id },
  //   });

  //   if (!userChallenge) {
  //     userChallenge = userChallengeRepository.create({
  //       user_id,
  //       mission_routine_id,
  //       mission_goal: count, // 처음부터 count 값을 설정
  //     });

  //     userChallenge = await userChallengeRepository.save(userChallenge);
  //   } else {
  //     await userChallengeRepository.increment(
  //       { user_id, mission_routine_id },
  //       'mission_goal',
  //       count,
  //     );

  //     userChallenge = await userChallengeRepository.findOne({
  //       where: { user_id, mission_routine_id },
  //     });
  //   }

  //   return userChallenge;
  // }

  // async challengeQuestReward(
  //   user_id: string,
  //   mission_routine_id: number,
  //   count: number,
  //   qr?: QueryRunner,
  // ) {
  //   const userChallengeRepository = this.getUserChallengeRepository(qr);
  //   const userChallenge = await userChallengeRepository.findOne({
  //     where: { user_id, mission_routine_id },
  //   });

  //   const missionRoutine = await this.missionRoutineService.getMissionRoutine(
  //     mission_routine_id,
  //     qr,
  //   );

  //   const rewardData = await this.rewardOfferService.reward(
  //     user_id,
  //     missionRoutine.reward_id,
  //     qr,
  //   );

  //   userChallenge.reward_yn = 'Y';
  //   const result = await userChallengeRepository.save(userChallenge);

  //   return {
  //     reward: {
  //       userItemData: rewardData,
  //     },
  //     userChallenge: result,
  //   };
  // }

  // async challengeQuestextraReward(
  //   user_id: string,
  //   mission_kind: string,
  //   complete_count: number,
  //   qr?: QueryRunner,
  // ) {
  //   const userChallengeRepository = this.getUserChallengeRepository(qr);
  //   const userChallenge = await userChallengeRepository.find({
  //     where: { user_id, mission_kind },
  //   });

  //   const missionRoutineBonus =
  //     await this.missionRoutineBonusService.getMissionRoutineBonus(
  //       mission_kind,
  //       complete_count,
  //     );

  //   const rewardData = await this.rewardOfferService.reward(
  //     user_id,
  //     missionRoutineBonus.reward_id,
  //     qr,
  //   );

  //   return {
  //     reward: {
  //       userItemData: rewardData,
  //     },
  //     userChallenge: userChallenge,
  //   };
  // }
}
