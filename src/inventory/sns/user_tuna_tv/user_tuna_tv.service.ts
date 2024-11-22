import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTunaTv } from './entities/user_tuna_tv.entity';
import { QueryRunner, Repository } from 'typeorm';
import { SnsLevelService } from 'src/static-table/sns/sns_level/sns_level.service';
import { SnsConfigService } from 'src/static-table/sns/sns_config/sns_config.service';
import { SnsLikeRuleService } from 'src/static-table/sns/sns_like_rule/sns_like_rule.service';
import { SnsRewardService } from 'src/static-table/sns/sns_reward/sns_reward.service';

@Injectable()
export class UserTunaTvService {
  constructor(
    @InjectRepository(UserTunaTv)
    private readonly userTunaTvRepository: Repository<UserTunaTv>,
    //private readonly redisService: RedisService,
    private readonly snsConfigService: SnsConfigService,
    private readonly snsLevelService: SnsLevelService,
    private readonly snsLikeRuleService: SnsLikeRuleService,
    private readonly snsRewardService: SnsRewardService,
  ) {}

  getUserTunaTvRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserTunaTv>(UserTunaTv)
      : this.userTunaTvRepository;
  }

  async tunaTvSave(user_id: number, user_quest_id: number, qr?: QueryRunner) {
  

  }

  // async tunaTvSave(user_id: number, user_quest_id: number, qr?: QueryRunner) {
  //   console.log('user_id:', user_id);
  //   console.log('user_quest_id:', user_quest_id);

  //   const userQuestRepository = this.getUserQuestRepository(qr);
  //   const userQuestData = await userQuestRepository.findOne({
  //     where: {
  //       id: user_quest_id,
  //     },
  //   });
  //   console.log('userQuestData:', userQuestData);

  //   const missionRoutineData =
  //     await this.missionRoutineService.getMissionRoutine(
  //       userQuestData.progress_mission_id,
  //     );

  //   console.log('missionRoutineData.reward_id', missionRoutineData.reward_id);
  //   const rewardData = await this.rewardOfferService.reward(
  //     user_id,
  //     missionRoutineData.reward_id,
  //   );

  //   await userQuestRepository.save({
  //     ...userQuestData,
  //     mission_complete_yn: 'Y',
  //     reward_yn: 'Y',
  //   });

  //   return rewardData;
  // }
}
