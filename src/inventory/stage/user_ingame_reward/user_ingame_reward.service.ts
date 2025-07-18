import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { UserIngameReward } from './entities/user_ingame_reward.entity';
import { BattleStageService } from 'src/static-table/stage/battle_stage/battle_stage.service';
import { RunStageService } from 'src/static-table/stage/run_stage/run_stage.service';
import { PuzzleStageService } from 'src/static-table/stage/puzzle_stage/puzzle_stage.service';
//import { ResourceManagerService } from 'src/supervisor/resource_manager/resource_manager.service';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { BountyStageService } from 'src/static-table/stage/bounty_stage/bounty_stage.service';
import { DataSource } from 'typeorm';
import { UserChallengeService } from 'src/inventory/challenge/user_challenge/user_challenge.service';
import { GameLogsService } from 'src/game_log/game_logs/game_logs.service';
import { LogType } from 'src/common/const/log-type.enum';

@Injectable()
export class UserIngameRewardService {
  constructor(
    @InjectRepository(UserIngameReward)
    private readonly userIngameRewardRepository: Repository<UserIngameReward>,
    private readonly battleStageService: BattleStageService,
    private readonly runStageService: RunStageService,
    private readonly puzzleStageService: PuzzleStageService,
    private readonly bountyStageService: BountyStageService,
    private readonly rewardOfferService: RewardOfferService,
    private readonly userChallengeService: UserChallengeService,
    private readonly gameLogsService: GameLogsService,
    private readonly dataSource: DataSource,
  ) {}

  getUserIngameRewardRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserIngameReward>(UserIngameReward)
      : this.userIngameRewardRepository;
  }

  async getIngameReward(user_id: string, qr?: QueryRunner) {
    const userIngameRewardRepository = this.getUserIngameRewardRepository(qr);

    // 기존 보상 내역 확인
    const ingameReward = await userIngameRewardRepository.find({
      where: { user_id },
    });

    console.log('ingameReward', ingameReward);
    return ingameReward;
  }

  async stageReward(
    user_id: string,
    game_mode: string,
    stage_id: number,
    stage_clear_yn: string,
    secame_credit: number,
    mission_id: number,
    etc: any,
    qr?: QueryRunner,
  ) {
    let rewardData = {};
    let firstClear = false;

    const userIngameRewardRepository = this.getUserIngameRewardRepository(qr);

    // 기존 보상 내역 확인
    const existingReward = await userIngameRewardRepository.findOne({
      where: { user_id, game_mode, stage_id, first_clear_yn: 'Y' },
    });

    if (!existingReward) {
      firstClear = stage_clear_yn === 'Y';
    } else if (existingReward?.first_clear_yn === 'N') {
      firstClear = stage_clear_yn === 'Y';
    }

    switch (game_mode) {
      case 'BATTLE':
        rewardData = await this.battleStageService.getBattleStage(stage_id, qr);
        break;
      case 'RUN':
        rewardData = await this.runStageService.getRunStage(stage_id, qr);
        break;
      case 'PUZZLE':
        rewardData = await this.puzzleStageService.getPuzzleStage(stage_id, qr);
        break;
      case 'BOUNTY':
        rewardData = await this.bountyStageService.getBountyStage(stage_id, qr);
        break;
      default:
        console.log('game mode not exist.');
        throw new BadRequestException(
          'BATTLE, RUN, PUZZLE, BOUNTY 로 요청 해주세요.',
        );
    }

    if (!rewardData) {
      throw new Error('Stage not found');
    }

    const cacluRewardData = await this.calculateRewards(
      rewardData,
      firstClear,
      stage_clear_yn,
    );

    await this.rewardOfferService.rewardCurrencyAll(
      user_id,
      {
        gord: cacluRewardData.gold,
        exp: cacluRewardData.exp,
        diamond_free: cacluRewardData.dia,
      },
      qr,
    );

    let rewardItemdData = await this.rewardOfferService.reward(
      user_id,
      cacluRewardData.group_id,
      qr,
    );

    rewardItemdData = [
      ...rewardItemdData,
      { item_id: 11100002, item_count: cacluRewardData.gold }, // gold
      { item_id: 11100005, item_count: cacluRewardData.exp }, // exp
      { item_id: 11100004, item_count: cacluRewardData.dia }, // dia
    ];

    const user = await this.rewardOfferService.secameCreditReward(
      user_id,
      secame_credit,
      qr,
    );

    if (stage_clear_yn === 'Y') {
      await this.incrementMissionClearCount(user_id, mission_id);
      // 인게임 클리어 퀘스트
      await this.userChallengeService.challengeQuest(user_id, 12400004, 1);
    }

    if (+secame_credit === 500) {
      await this.userChallengeService.challengeQuest(user_id, 12400008, 500);
    }
    // 인게임 오브젝트 파괴
    if (+etc > 0) {
      await this.userChallengeService.challengeQuest(user_id, 12400010, 1);
    }

    const newReward = userIngameRewardRepository.create({
      user_id,
      game_mode,
      stage_id,
      stage_clear_yn,
      first_clear_yn: firstClear ? 'Y' : 'N',
      rank: '',
      reward_id: cacluRewardData.group_id,
    });

    await userIngameRewardRepository.save(newReward);

    // 전투결과 로그
    const ingameBattleLog = {
      game_mode,
      stage_id,
      stage_clear_yn,
      secame_credit,
      mission_id,
      etc,
      userItemData: rewardItemdData,
    };

    await this.gameLogsService.insertLog(
      LogType.PLAYER_STAGE_REWARD,
      user_id,
      ingameBattleLog,
    );

    return {
      user,
      reward: {
        userItemData: rewardItemdData,
      },
    };

    // return {
    //   user,
    //   userItemData: reward,
    // };
  }

  async incrementMissionClearCount(user_id: string, mission_id: number) {
    await this.dataSource.query(
      `UPDATE user_mission 
     SET clear_count = clear_count + 1 
     WHERE user_id = ? AND mission_id = ?`,
      [user_id, mission_id],
    );
  }

  async calculateRewards(
    rewardData: any,
    firstClear: boolean,
    stage_clear_yn: string,
  ) {
    let gold = 0,
      exp = 0,
      dia = 0,
      group_id = 0;

    if (stage_clear_yn === 'Y') {
      if (firstClear) {
        gold = rewardData.first_clear_gold ?? 0;
        exp = rewardData.first_clear_exp ?? 0;
        dia = rewardData.first_clear_dia ?? 0;
        group_id = rewardData.first_clear_group_id ?? 0;
      } else {
        gold = rewardData.reclear_gold ?? 0;
        exp = rewardData.reclear_exp ?? 0;
        group_id = rewardData.reclear_group_id ?? 0;
      }

      // 승
    } else {
      gold = rewardData.fail_gold ?? 0;
      exp = rewardData.fail_exp ?? 0;
      group_id = rewardData.fail_group_id ?? 0;

      // 패
    }

    return { gold, exp, dia, group_id };
  }
}
