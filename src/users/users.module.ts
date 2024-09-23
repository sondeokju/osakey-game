import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModel } from './entity/users.entity';
import { AccountLevel } from 'src/static-table/account_level/entities/account_level.entity';
import { AccountLevelService } from 'src/static-table/account_level/account_level.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersModel])],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, AccountLevelService],
})
export class UsersModule {}
