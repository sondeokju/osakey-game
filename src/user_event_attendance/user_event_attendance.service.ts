import { Injectable } from '@nestjs/common';
import { CreateUserEventAttendanceDto } from './dto/create-user_event_attendance.dto';
import { UpdateUserEventAttendanceDto } from './dto/update-user_event_attendance.dto';

@Injectable()
export class UserEventAttendanceService {
  create(createUserEventAttendanceDto: CreateUserEventAttendanceDto) {
    return 'This action adds a new userEventAttendance';
  }

  findAll() {
    return `This action returns all userEventAttendance`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userEventAttendance`;
  }

  update(id: number, updateUserEventAttendanceDto: UpdateUserEventAttendanceDto) {
    return `This action updates a #${id} userEventAttendance`;
  }

  remove(id: number) {
    return `This action removes a #${id} userEventAttendance`;
  }
}
