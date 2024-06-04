import { PartialType } from '@nestjs/mapped-types';
import { CreateUserEventAttendanceDto } from './create-user_event_attendance.dto';

export class UpdateUserEventAttendanceDto extends PartialType(CreateUserEventAttendanceDto) {}
