import { Controller } from '@nestjs/common';
import { UserMemoryRentService } from './user_memory_rent.service';

@Controller('user-memory-rent')
export class UserMemoryRentController {
  constructor(private readonly userMemoryRentService: UserMemoryRentService) {}
}
