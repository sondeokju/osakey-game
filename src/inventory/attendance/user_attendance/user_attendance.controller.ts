import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserAttendanceService } from './user_attendance.service';
import { CreateUserAttendanceDto } from './dto/create-user_attendance.dto';
import { UpdateUserAttendanceDto } from './dto/update-user_attendance.dto';

@Controller('user-attendance')
export class UserAttendanceController {
  constructor(private readonly userAttendanceService: UserAttendanceService) {}

  @Post()
  create(@Body() createUserAttendanceDto: CreateUserAttendanceDto) {
    return this.userAttendanceService.create(createUserAttendanceDto);
  }

  @Get()
  findAll() {
    return this.userAttendanceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAttendanceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserAttendanceDto: UpdateUserAttendanceDto) {
    return this.userAttendanceService.update(+id, updateUserAttendanceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAttendanceService.remove(+id);
  }
}
