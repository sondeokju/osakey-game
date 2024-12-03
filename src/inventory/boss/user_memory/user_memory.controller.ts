import { Controller, Get, Post } from '@nestjs/common';
import { UserMemoryService } from './user_memory.service';

@Controller('user-memory')
export class UserMemoryController {
  constructor(private readonly userMemoryService: UserMemoryService) {}
}
