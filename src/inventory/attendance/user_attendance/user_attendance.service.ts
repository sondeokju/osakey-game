import {
  BadRequestException,
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
    try {
      if (!user_id || typeof user_id !== 'string') {
        throw new BadRequestException('Invalid user_id provided.');
      }

      const userAttendanceRepository = this.getUserAttendanceRepository(qr);

      // 사용자의 출석 데이터 조회
      let userAttendance = await userAttendanceRepository.findOne({
        where: { user_id },
      });

      console.log('userAttendance', userAttendance);

      if (
        !userAttendance ||
        (userAttendance.board_num === 5 && userAttendance.day === 7)
      ) {
        await userAttendanceRepository.delete(user_id);
        // 첫 출석 처리
        const attendanceData = await this.fetchAttendanceData(1, 1, qr);

        userAttendance.board_num = attendanceData.board_num;
        userAttendance.day = attendanceData.day;
        userAttendance.reward_id = attendanceData.reward_id;
      } else if (userAttendance.day < 7) {
        // 7일 미만의 출석 처리
        const attendanceData = await this.fetchAttendanceData(
          userAttendance.board_num,
          userAttendance.day + 1,
          qr,
        );

        userAttendance.board_num = attendanceData.board_num;
        userAttendance.day = attendanceData.day;
        userAttendance.reward_id = attendanceData.reward_id;
      } else {
        // 7일 출석 완료 처리 (영웅 레벨 체크 포함)
        const attendanceData = await this.fetchAttendanceData(
          userAttendance.board_num + 1,
          1,
          qr,
        );
        const usersData = await this.usersService.getMe(user_id, qr);

        if (
          usersData.level >= attendanceData.board_min_hero_lv &&
          usersData.level <= attendanceData.board_max_hero_lv
        ) {
          userAttendance.board_num = attendanceData.board_num;
          userAttendance.day = attendanceData.day;
          userAttendance.reward_id = attendanceData.reward_id;
        }
      }

      const insertAttendance = userAttendanceRepository.create({
        user_id,
        board_num: userAttendance.board_num,
        day: userAttendance.day,
        reward_id: userAttendance.reward_id,
      });

      // 데이터 저장
      return await userAttendanceRepository.save(insertAttendance);
    } catch (error) {
      console.error('Error saving attendance:', error);
      throw new InternalServerErrorException('Failed to save attendance.');
    }
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

  async attendanceList(user_id: string, qr?: QueryRunner) {
    const userAttendanceRepository = this.getUserAttendanceRepository(qr);
    const userAttendance = await userAttendanceRepository.find({
      where: {
        user_id,
      },
    });

    return userAttendance;
  }
}
