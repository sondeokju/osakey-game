import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryRunner, Repository } from 'typeorm';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepository: Repository<Attendance>,
  ) {}

  getAttendanceRepository(qr?: QueryRunner) {
    return qr
      ? qr.manager.getRepository<Attendance>(Attendance)
      : this.attendanceRepository;
  }

  async getAttendanceAll(qr?: QueryRunner) {
    const attendanceRepository = this.getAttendanceRepository(qr);
    const result = await attendanceRepository.find({});
    return result;
  }

  async getAttendance(id: number, qr?: QueryRunner) {
    const attendanceRepository = this.getAttendanceRepository(qr);
    const result = await attendanceRepository.findOne({
      where: {
        id,
      },
    });

    return result;
  }

  async getAttendanceDay(board_num: number, day: number, qr?: QueryRunner) {
    const attendanceRepository = this.getAttendanceRepository(qr);
    const result = await attendanceRepository.findOne({
      where: {
        board_num,
        day,
      },
    });

    return result;
  }
}
