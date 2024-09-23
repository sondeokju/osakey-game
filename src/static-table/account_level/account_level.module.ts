import { Module } from '@nestjs/common';
import { AccountLevelService } from './account_level.service';
import { AccountLevelController } from './account_level.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountLevel } from './entities/account_level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccountLevel])],
  exports: [AccountLevelService],
  controllers: [AccountLevelController],
  providers: [AccountLevelService],
})
export class AccountLevelModule {}
