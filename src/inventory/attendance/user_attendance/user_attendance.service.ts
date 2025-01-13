import { Injectable } from '@nestjs/common';
import { CreateUserAttendanceDto } from './dto/create-user_attendance.dto';
import { UpdateUserAttendanceDto } from './dto/update-user_attendance.dto';

@Injectable()
export class UserAttendanceService {
  create(createUserAttendanceDto: CreateUserAttendanceDto) {
    return 'This action adds a new userAttendance';
  }

  findAll() {
    return `This action returns all userAttendance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAttendance`;
  }

  update(id: number, updateUserAttendanceDto: UpdateUserAttendanceDto) {
    return `This action updates a #${id} userAttendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} userAttendance`;
  }
}
