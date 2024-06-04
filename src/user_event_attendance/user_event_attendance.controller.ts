import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserEventAttendanceService } from './user_event_attendance.service';
import { CreateUserEventAttendanceDto } from './dto/create-user_event_attendance.dto';
import { UpdateUserEventAttendanceDto } from './dto/update-user_event_attendance.dto';

@Controller('user-event-attendance')
export class UserEventAttendanceController {
  constructor(private readonly userEventAttendanceService: UserEventAttendanceService) {}

  @Post()
  create(@Body() createUserEventAttendanceDto: CreateUserEventAttendanceDto) {
    return this.userEventAttendanceService.create(createUserEventAttendanceDto);
  }

  @Get()
  findAll() {
    return this.userEventAttendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userEventAttendanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserEventAttendanceDto: UpdateUserEventAttendanceDto) {
    return this.userEventAttendanceService.update(+id, updateUserEventAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userEventAttendanceService.remove(+id);
  }
}
