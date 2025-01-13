import { PartialType } from '@nestjs/mapped-types';
import { CreateUserAttendanceDto } from './create-user_attendance.dto';

export class UpdateUserAttendanceDto extends PartialType(CreateUserAttendanceDto) {}
