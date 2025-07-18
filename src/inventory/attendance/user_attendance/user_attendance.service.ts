import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAttendance } from './entities/user_attendance.entity';
import { QueryRunner, Repository } from 'typeorm';
import { RewardOfferService } from 'src/supervisor/reward_offer/reward_offer.service';
import { AttendanceService } from 'src/static-table/attendance/attendance/attendance.service';
import { UsersService } from 'src/users/users.service';
import { UserChallengeService } from 'src/inventory/challenge/user_challenge/user_challenge.service';
import { GameLogsService } from 'src/game_log/game_logs/game_logs.service';
import { LogType } from 'src/common/const/log-type.enum';

@Injectable()
export class UserAttendanceService {
  constructor(
    @InjectRepository(UserAttendance)
    private readonly userAttendanceRepository: Repository<UserAttendance>,
    private readonly rewardOfferService: RewardOfferService,
    private readonly attendanceService: AttendanceService,
    private readonly usersService: UsersService,
    private readonly userChallengeService: UserChallengeService,
    private readonly gameLogsService: GameLogsService,
  ) {}

  getUserAttendanceRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserAttendance>(UserAttendance)
      : this.userAttendanceRepository;
  }

  async saveAttendance(user_id: string, qr?: QueryRunner) {
    if (!user_id || typeof user_id !== 'string') {
      return {
        code: 0,
        message: `Invalid user_id provided.`,
        utcTimeString: new Date().toISOString(),
        hasError: false,
      };
    }

    const userAttendanceRepository = this.getUserAttendanceRepository(qr);

    const MAX_BOARD_NUM = 5;
    const MAX_DAY = 7;

    try {
      let userAttendance = await this.getUserAttendance(
        user_id,
        userAttendanceRepository,
      );

      const isCheckUpdate = await this.checkUpdateDate(user_id, qr);
      if (!isCheckUpdate) {
        return {
          code: 0,
          message: `The update has already been completed today.`,
          utcTimeString: new Date().toISOString(),
          hasError: false,
        };
      }

      if (!userAttendance) {
        userAttendance = await this.initializeAttendance(
          user_id,
          qr,
          userAttendanceRepository,
        );

        return await userAttendanceRepository.save(userAttendance);
      }

      if (this.isLastAttendance(userAttendance, MAX_BOARD_NUM, MAX_DAY)) {
        const userResetAttendance = await this.resetAttendance(
          user_id,
          qr,
          userAttendanceRepository,
        );
        userAttendance.board_num = userResetAttendance.board_num;
        userAttendance.day = userResetAttendance.day;
        userAttendance.reward_id = userResetAttendance.reward_id;
      } else if (userAttendance.day < MAX_DAY) {
        userAttendance = await this.updateDailyAttendance(userAttendance, qr);
      } else {
        userAttendance = await this.moveToNextBoard(
          userAttendance,
          user_id,
          qr,
        );
      }

      return await userAttendanceRepository.save({
        ...userAttendance,
        reward_yn: 'N',
      });
    } catch (error) {
      return {
        code: 0,
        message: `Failed to save attendance.`,
        utcTimeString: new Date().toISOString(),
        hasError: false,
      };
    }
  }

  private async getUserAttendance(user_id: string, repository) {
    return repository.findOne({ where: { user_id } });
  }

  //   private async initializeAttendance(
  //   user_id: string,
  //   qr: QueryRunner,
  //   repository,
  // ) {
  //   const attendanceData = await this.fetchAttendanceData(1, 1, qr);
  //   const userAttendance = repository.create({
  //     user_id,
  //     board_num: attendanceData.board_num,
  //     day: attendanceData.day,
  //     reward_id: attendanceData.reward_id,
  //   });
  //   return userAttendance;
  // }

  private async initializeAttendance(
    user_id: string,
    qr: QueryRunner,
    repository,
  ) {
    const attendanceData = await this.fetchAttendanceData(1, 1, qr);
    const userAttendance = {
      user_id,
      board_num: attendanceData.board_num,
      day: attendanceData.day,
      reward_id: attendanceData.reward_id,
    };
    return userAttendance;
  }

  private isLastAttendance(
    userAttendance,
    maxBoardNum: number,
    maxDay: number,
  ) {
    return (
      userAttendance.board_num === maxBoardNum && userAttendance.day === maxDay
    );
  }

  private async resetAttendance(user_id: string, qr: QueryRunner, repository) {
    return this.initializeAttendance(user_id, qr, repository);
  }

  private async updateDailyAttendance(userAttendance, qr: QueryRunner) {
    const attendanceData = await this.fetchAttendanceData(
      userAttendance.board_num,
      userAttendance.day + 1,
      qr,
    );
    userAttendance.board_num = attendanceData.board_num;
    userAttendance.day = attendanceData.day;
    userAttendance.reward_id = attendanceData.reward_id;
    return userAttendance;
  }

  private async moveToNextBoard(
    userAttendance,
    user_id: string,
    qr: QueryRunner,
  ) {
    console.log('moveToNextBoard', userAttendance);
    const [attendanceData, usersData] = await Promise.all([
      this.fetchAttendanceData(+userAttendance.board_num + 1, 1, qr),
      this.usersService.getMe(user_id, qr),
    ]);

    if (
      usersData.level >= attendanceData.board_min_hero_lv &&
      usersData.level <= attendanceData.board_max_hero_lv
    ) {
      userAttendance.board_num = attendanceData.board_num;
      userAttendance.day = attendanceData.day;
      userAttendance.reward_id = attendanceData.reward_id;
    }

    return userAttendance;
  }

  // 출석 데이터 조회 로직을 별도 함수로 분리
  private async fetchAttendanceData(
    board_num: number,
    day: number,
    qr?: QueryRunner,
  ) {
    const attendanceData = await this.attendanceService.getAttendanceDay(
      board_num,
      day,
      qr,
    );
    if (!attendanceData) {
      return {
        code: 0,
        message: `Attendance data not found for board_num: ${board_num}`,
        utcTimeString: new Date().toISOString(),
        hasError: false,
      };
    }
    return {
      board_num: attendanceData.board_num,
      day: attendanceData.day,
      board_min_hero_lv: attendanceData.board_min_hero_lv,
      board_max_hero_lv: attendanceData.board_max_hero_lv,
      reward_id: attendanceData.reward_id,
    };
  }

  async checkUpdateDate(user_id: string, qr?: QueryRunner) {
    const userAttendanceRepository = this.getUserAttendanceRepository(qr);
    const userAttendance = await userAttendanceRepository.findOne({
      where: {
        user_id,
      },
    });

    console.log(userAttendance);
    if (userAttendance) {
      console.log('1');
      const today = new Date();
      const updateDate = new Date(userAttendance.update_at);

      // update_at과 오늘 날짜 비교 (연, 월, 일 기준)
      const isSameDay =
        today.getFullYear() === updateDate.getFullYear() &&
        today.getMonth() === updateDate.getMonth() &&
        today.getDate() === updateDate.getDate();

      if (isSameDay) {
        return false;
      }
    }

    console.log('2');
    return true;
  }

  async attendance(user_id: string, qr?: QueryRunner) {
    const userAttendanceRepository = this.getUserAttendanceRepository(qr);
    const userAttendance = await userAttendanceRepository.findOne({
      where: {
        user_id,
      },
    });

    return userAttendance;
  }

  async getAttendanceAll(user_id: string, qr?: QueryRunner) {
    const userAttendanceRepository = this.getUserAttendanceRepository(qr);
    const userAttendance = await userAttendanceRepository.findOne({
      where: {
        user_id,
      },
    });

    return userAttendance;
  }

  async attendanceReward(
    user_id: string,
    //ser_attendance_id: number,
    qr?: QueryRunner,
  ) {
    const userAttendanceRepository = this.getUserAttendanceRepository(qr);
    const userAttendanceData = await userAttendanceRepository.findOne({
      where: {
        //id: user_attendance_id,
        user_id,
      },
    });

    if (!userAttendanceData) {
      throw new NotFoundException('userAttendanceData not found.');
    }

    // const achieveData = await this.achieveListService.getAttendance(
    //   userAchieve.achieve_id,
    //   qr,
    // );

    if (userAttendanceData.reward_yn === 'Y') {
      return {
        //statusCode: 400,
        message: 'You have already claimed the attendance reward.',
      };
    }

    const rewardData = await this.rewardOfferService.reward(
      user_id,
      userAttendanceData.reward_id,
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

    userAttendanceData.reward_yn = 'Y';
    const updatedUserAttendance =
      await userAttendanceRepository.save(userAttendanceData);

    // 출석 보상 퀘스트
    await this.userChallengeService.challengeQuest(user_id, 12400001, 1);

    // 출석 보상 로그
    const attendanceLog = {
      userItemData: rewardData,
      userAttendance: updatedUserAttendance,
    };

    await this.gameLogsService.insertLog(
      LogType.PLAYER_ATTENDANCE_REWARD,
      user_id,
      attendanceLog,
    );

    return {
      reward: {
        userItemData: rewardData,
      },
      userAttendanceData: updatedUserAttendance,
    };
  }
}
