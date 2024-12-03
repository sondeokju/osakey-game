import { Module } from '@nestjs/common';
import { UserMemoryRentService } from './user_memory_rent.service';
import { UserMemoryRentController } from './user_memory_rent.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMemoryRent } from './entities/user_memory_rent.entity';
import { UserMemory } from '../user_memory/entities/user_memory.entity';
import { UserMemoryService } from '../user_memory/user_memory.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserMemoryRent, UserMemory])],
  exports: [UserMemoryRentService],
  controllers: [UserMemoryRentController],
  providers: [UserMemoryRentService, UserMemoryService],
})
export class UserMemoryRentModule {}
