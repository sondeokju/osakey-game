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

@Injectable()
export class UserAttendanceService {
  constructor(
    @InjectRepository(UserAttendance)
    private readonly userAttendanceRepository: Repository<UserAttendance>,
    private readonly rewardOfferService: RewardOfferService,
    private readonly attendanceService: AttendanceService,
    private readonly usersService: UsersService,
  ) {}

  getUserAttendanceRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<UserAttendance>(UserAttendance)
      : this.userAttendanceRepository;
  }

  async saveAttendance(user_id: string, qr?: QueryRunner) {
    if (!user_id || typeof user_id !== 'string') {
      throw new BadRequestException('Invalid user_id provided.');
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
        return { message: '오늘 이미 업데이트가 완료되었습니다.' };
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

      return await userAttendanceRepository.save(userAttendance);
    } catch (error) {
      console.error('Error saving attendance:', error);
      throw new InternalServerErrorException('Failed to save attendance.');
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
      throw new NotFoundException(
        `Attendance data not found for board_num: ${board_num}`,
      );
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

  async attendanceReward(
    user_id: string,
    user_attendance_id: number,
    qr?: QueryRunner,
  ) {
    const userAttendanceRepository = this.getUserAttendanceRepository(qr);
    const userAttendanceData = await userAttendanceRepository.findOne({
      where: {
        id: user_attendance_id,
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
      throw new NotFoundException(
        'You have already claimed the Achieve reward.',
      );
    }
    const rewardData = await this.rewardOfferService.reward(
      user_id,
      userAttendanceData.reward_id,
      qr,
    );

    if (!rewardData) {
      throw new BadRequestException('Failed to process reward.');
    }

    userAttendanceData.reward_yn = 'Y';
    const updatedUserAttendance =
      await userAttendanceRepository.save(userAttendanceData);

    return {
      success: true,
      reward: rewardData,
      userAttendance: updatedUserAttendance,
    };
  }
}
